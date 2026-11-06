import { ArrowUpRight } from 'lucide-react'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { profile } from '../../data/profile'
import { makeIdCardFace } from '../../lib/idCardFace'
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
  const [face, setFace] = useState<string>()
  useEffect(() => {
    if (near && !face) makeIdCardFace().then(setFace, () => setFace(profile.photo))
  }, [near, face])

  return (
    <section ref={ref} id="contact" aria-labelledby="contact-title" className="overflow-hidden bg-blue px-4 py-16 sm:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 md:grid-cols-2">
        <div ref={cardRef} className="relative h-[420px] md:h-[600px]" aria-hidden>
          {near && face && (
            <Suspense fallback={null}>
              {/* kanvas naik sampai tepi atas section (setara padding py-16/md:py-24) agar tali tergantung dari atas */}
              <Lanyard frontImage={face} backImage={face} size={0.7} strapLength={0.3} strapWidth={0.45} className="absolute inset-x-0 bottom-0 -top-16 md:-top-24" />
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
