import { useEffect, type RefObject } from 'react'

// Menggerakkan --mx/--my pada `layer` mengikuti kursor (lerp 0.1), relatif ke kotak `layer` sendiri.
// Layar sentuh tidak punya kursor: sorot melayang sendiri dan pindah ke tempat jari menyentuh; diam bila reduced motion.
export function useSpotlight(layer: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const target = layer.current
    if (!target) return

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = matchMedia('(pointer: coarse)').matches
    const rect = () => target.getBoundingClientRect()
    const cur = coarse ? { x: rect().width * 0.5, y: rect().height * 0.45 } : { x: -999, y: -999 }
    const goal = { ...cur }
    const base = { ...cur }
    let touched = false
    let raf = 0
    let visible = true
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(target)

    const onMove = (e: PointerEvent) => {
      const r = rect()
      goal.x = e.clientX - r.left
      goal.y = e.clientY - r.top
    }
    const onTouch = (e: TouchEvent) => {
      const r = rect()
      base.x = e.touches[0].clientX - r.left
      base.y = e.touches[0].clientY - r.top
      touched = true
    }
    const onLeave = () => {
      goal.x = goal.y = -999
    }
    if (coarse) {
      window.addEventListener('touchstart', onTouch, { passive: true })
      window.addEventListener('touchmove', onTouch, { passive: true })
    } else {
      window.addEventListener('pointermove', onMove)
      document.documentElement.addEventListener('pointerleave', onLeave)
    }

    const tick = (t: number) => {
      if (!visible) {
        raf = requestAnimationFrame(tick)
        return
      }
      if (coarse && !reduce) {
        const r = rect()
        // setelah disentuh, sorot hanya bergoyang kecil di sekitar jari
        goal.x = touched ? base.x + 40 * Math.sin(t / 1800) : r.width * (0.5 + 0.25 * Math.sin(t / 1800))
        goal.y = touched ? base.y + 30 * Math.sin(t / 1300 + 1) : r.height * (0.45 + 0.15 * Math.sin(t / 1300 + 1))
      }
      if (Math.abs(goal.x - cur.x) > 0.1 || Math.abs(goal.y - cur.y) > 0.1) {
        cur.x += (goal.x - cur.x) * 0.1
        cur.y += (goal.y - cur.y) * 0.1
        target.style.setProperty('--mx', `${cur.x}px`)
        target.style.setProperty('--my', `${cur.y}px`)
      }
      raf = requestAnimationFrame(tick)
    }
    target.style.setProperty('--mx', `${cur.x}px`)
    target.style.setProperty('--my', `${cur.y}px`)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('touchstart', onTouch)
      window.removeEventListener('touchmove', onTouch)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [layer])
}
