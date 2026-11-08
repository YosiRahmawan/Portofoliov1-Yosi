import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap } from '../../lib/gsap'

// Kata-kata mulai samar lalu menyala satu per satu mengikuti scroll (scrub), seperti sedang diketik.
export function ScrollText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-w]',
          { opacity: 0.18 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 1,
            scrollTrigger: { trigger: ref.current, start: 'top 85%', end: 'bottom 55%', scrub: 0.5 },
          },
        )
      })
    },
    { scope: ref },
  )

  return (
    <p ref={ref} className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i}>
          {i > 0 && ' '}
          <span data-w>{w}</span>
        </span>
      ))}
    </p>
  )
}
