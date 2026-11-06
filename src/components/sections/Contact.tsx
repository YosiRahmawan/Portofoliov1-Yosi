import { ArrowUpRight } from 'lucide-react'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { profile } from '../../data/profile'
import { socials } from '../../data/socials'
import { useReveal } from '../../hooks/useReveal'
import { ContactForm } from '../ui/ContactForm'
import { Em, SectionTitle } from '../ui/Heading'

// three.js dimuat hanya saat bagian ini mendekati layar
const Lanyard = lazy(() => import('../reactbits/Lanyard'))

function useNearViewport(ref: React.RefObject<HTMLElement | null>) {
  const [near, setNear] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '300px' })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return near
}

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  useReveal(ref)
  const near = useNearViewport(cardRef)

  return (
    <section ref={ref} id="contact" aria-labelledby="contact-title" className="overflow-hidden bg-blue px-4 py-16 sm:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 md:grid-cols-2">
        <div ref={cardRef} className="relative h-[420px] md:h-[600px]" aria-hidden>
          {near && (
            <Suspense fallback={null}>
              <Lanyard frontImage={profile.photo} className="absolute inset-0" />
            </Suspense>
          )}
        </div>
        <div>
          <div data-reveal>
            <SectionTitle id="contact-title">Let&apos;s <Em>work</Em> together</SectionTitle>
          </div>
          <div data-reveal className="mt-8">
            <ContactForm />
          </div>
          <ul data-reveal className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {socials.filter((s) => s.url).map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-black">
                  {s.label} <ArrowUpRight size={16} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
