import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const token = (name: string) => new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue(name).trim())

const SPHERE_VERT = `
varying vec3 vN; varying vec3 vP;
void main() {
  vN = normalize(normalMatrix * normal);
  vP = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

// Tepi menyala (fresnel) + pita cahaya yang mengalir di permukaan
const SPHERE_FRAG = `
uniform float uTime; uniform vec3 uBlue; uniform vec3 uSky;
varying vec3 vN; varying vec3 vP;
void main() {
  float rim = pow(1.0 - abs(dot(normalize(vN), vec3(0.0, 0.0, 1.0))), 2.2);
  float bands = sin(vP.y * 7.0 + sin(vP.x * 3.0 + uTime * 0.8) * 1.6 + uTime * 0.6) * 0.5 + 0.5;
  float swirl = sin((vP.x + vP.z) * 6.0 - uTime * 0.9) * 0.5 + 0.5;
  vec3 col = mix(uBlue * 0.6, uSky, rim) + uSky * 0.45 * bands * swirl;
  gl_FragColor = vec4(col, 0.8 + rim * 0.5);
}`

const HALO_FRAG = `
uniform vec3 uBlue; varying vec2 vUv;
void main() {
  float d = distance(vUv, vec2(0.5)) * 2.0;
  float a = smoothstep(1.0, 0.0, d);
  gl_FragColor = vec4(mix(uBlue, uSky, 0.25), a * a * 1.1);
}`

// Bola 3D bercahaya (three.js). Hanya digambar saat terlihat; reduced motion = satu frame diam.
export function TechOrb({ className = '' }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      return // tanpa WebGL: bola tidak tampil, kartu tetap terbaca
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%'
    el.appendChild(renderer.domElement)

    const blue = token('--color-blue')
    const sky = token('--color-sky')
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50)
    camera.position.z = 5.4

    const uniforms = { uTime: { value: 0 }, uBlue: { value: blue }, uSky: { value: sky } }
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.ShaderMaterial({ uniforms, vertexShader: SPHERE_VERT, fragmentShader: SPHERE_FRAG, transparent: true, depthWrite: false }),
    )
    const halo = new THREE.Mesh(
      new THREE.PlaneGeometry(4.6, 4.6),
      new THREE.ShaderMaterial({
        uniforms: { uBlue: { value: blue } },
        vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
        fragmentShader: HALO_FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    )
    halo.position.z = -1

    const group = new THREE.Group()
    const ringMat = new THREE.MeshBasicMaterial({ color: sky, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false })
    const glowMat = new THREE.MeshBasicMaterial({ color: sky, transparent: true, opacity: 0.14, blending: THREE.AdditiveBlending, depthWrite: false })
    const rings = [
      [1.16, 0.012, [0.9, 0.2, 0]],
      [1.26, 0.006, [0.3, 1.1, 0.4]],
      [1.38, 0.004, [1.4, 0.6, 0.9]],
    ].map(([r, t, rot]) => {
      const m = new THREE.Mesh(new THREE.TorusGeometry(r as number, t as number, 8, 180), ringMat)
      m.rotation.set(...(rot as [number, number, number]))
      m.add(new THREE.Mesh(new THREE.TorusGeometry(r as number, (t as number) * 7, 8, 180), glowMat))
      return m
    })
    const N = 700
    const pos = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const r = 1.3 + Math.random() * 0.45
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      pos.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th)], i * 3)
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: sky, size: 0.018, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false }))

    group.add(sphere, ...rings, dust)
    scene.add(halo, group)

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / Math.max(h, 1)
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    const pointer = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / innerWidth - 0.5) * 2
      pointer.y = (e.clientY / innerHeight - 0.5) * 2
    }
    if (!reduce) window.addEventListener('pointermove', onMove)

    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(el)

    let raf = 0
    let last = performance.now()
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      if (visible && !document.hidden) {
        uniforms.uTime.value += dt
        group.rotation.y += dt * 0.15
        group.rotation.x += (pointer.y * 0.25 - group.rotation.x) * 0.04
        rings[0].rotation.z += dt * 0.5
        rings[1].rotation.x -= dt * 0.35
        rings[2].rotation.y += dt * 0.25
        renderer.render(scene, camera)
      }
      raf = requestAnimationFrame(frame)
    }
    if (reduce) renderer.render(scene, camera)
    else raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      ro.disconnect()
      io.disconnect()
      scene.traverse((o) => {
        const m = o as THREE.Mesh
        m.geometry?.dispose()
        ;[m.material].flat().forEach((mat) => mat?.dispose())
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={host} aria-hidden className={className} />
}
