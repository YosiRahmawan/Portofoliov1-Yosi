import { useEffect, useRef, useState } from 'react'

const MIN_MS = 1300
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches

// Aset yang harus siap sebelum hero tampil: dua lapis foto dan font. Gagal muat dianggap siap agar layar tidak macet.
function waitAssets(onStep: () => void): number {
  const urls = ['/images/hero-base.webp', '/images/hero-reveal.webp']
  urls.forEach((src) => {
    const img = new Image()
    img.onload = img.onerror = onStep
    img.src = src
  })
  document.fonts.ready.then(onStep, onStep)
  return urls.length + 1
}

export function Loader() {
  const [gone, setGone] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const num = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = document.documentElement
    root.style.overflow = 'hidden'
    let loaded = 0
    const total = waitAssets(() => loaded++)
    const min = reduce() ? 300 : MIN_MS
    const t0 = performance.now()
    let raf = 0
    let ended = false

    const finish = () => {
      if (ended) return
      ended = true
      root.style.overflow = ''
      root.classList.add('loaded')
      setLeaving(true)
      setTimeout(() => setGone(true), 600)
    }
    const tick = () => {
      const elapsed = performance.now() - t0
      const p = Math.min(loaded / total, elapsed / min)
      if (num.current) num.current.textContent = String(Math.round(p * 100))
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
      if (p >= 1) finish()
      else raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    const safety = setTimeout(finish, 5000)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(safety)
      root.style.overflow = ''
    }
  }, [])

  if (gone) return null
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-ink text-white transition-opacity duration-500 ease-out ${leaving ? 'opacity-0' : 'opacity-100'}`}
    >
      <p className="font-mono text-[11px] tracking-[0.2em] text-white/50 uppercase">Yosi Rahmawan</p>
      <p className="flex items-baseline text-7xl font-bold tracking-[-0.04em] tabular-nums">
        <span ref={num}>0</span>
        <span className="ml-1 text-3xl text-sky">%</span>
      </p>
      <span aria-hidden className="block h-px w-44 overflow-hidden bg-white/15">
        <span ref={bar} className="block h-full origin-left bg-blue [transform:scaleX(0)]" />
      </span>
      <p className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">Loading assets</p>
    </div>
  )
}
