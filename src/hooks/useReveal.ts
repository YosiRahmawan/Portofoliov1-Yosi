import { useGSAP } from '@gsap/react'
import type { RefObject } from 'react'
import { gsap } from '../lib/gsap'

// Fade-up untuk elemen [data-reveal] di dalam ref, dipicu IntersectionObserver
// (tetap jalan walau scroll melompat). Tidak aktif saat reduced motion.
export function useReveal(ref: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const els = gsap.utils.toArray<HTMLElement>('[data-reveal]')
        gsap.set(els, { opacity: 0, y: 32 })
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (!e.isIntersecting) return
              gsap.to(e.target, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
              io.unobserve(e.target)
            })
          },
          { rootMargin: '0px 0px -10% 0px' },
        )
        els.forEach((el) => io.observe(el))
        return () => io.disconnect()
      })
    },
    { scope: ref },
  )
}
