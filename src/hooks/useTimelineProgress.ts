import { useEffect, type RefObject } from 'react'

// Garis timeline terisi turun mengikuti scroll (scaleY pada [data-fill]); titik [data-dot] menyala saat ujung garis melewatinya.
// Reduced motion: garis langsung penuh mengikuti posisi tanpa easing.
export function useTimelineProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const ol = ref.current
    const fill = ol?.querySelector<HTMLElement>('[data-fill]')
    if (!ol || !fill) return
    const dots = [...ol.querySelectorAll<HTMLElement>('[data-dot]')]
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let cur = 0
    let raf = 0

    // ujung garis = titik di 60% tinggi layar, diukur dari atas daftar
    const target = () => Math.min(ol.offsetHeight, Math.max(0, innerHeight * 0.6 - ol.getBoundingClientRect().top))
    const paint = () => {
      fill.style.transform = `scaleY(${cur / Math.max(ol.offsetHeight, 1)})`
      for (const d of dots) {
        const y = (d.parentElement as HTMLElement).offsetTop + d.offsetTop + d.offsetHeight / 2
        d.toggleAttribute('data-on', cur >= y)
      }
    }
    const step = () => {
      const t = target()
      cur = reduce ? t : cur + (t - cur) * 0.14
      if (Math.abs(t - cur) < 0.5) cur = t
      paint()
      raf = !reduce && cur !== t ? requestAnimationFrame(step) : 0
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(step)
    }

    addEventListener('scroll', kick, { passive: true })
    addEventListener('resize', kick)
    kick()
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('scroll', kick)
      removeEventListener('resize', kick)
    }
  }, [ref])
}
