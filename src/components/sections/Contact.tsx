import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { profile } from '../../data/profile'
import { socials } from '../../data/socials'
import { useReveal } from '../../hooks/useReveal'
import Magnet from '../reactbits/Magnet'
import { Button } from '../ui/Button'
import { Em, SectionTitle } from '../ui/Heading'

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  const wa = profile.whatsapp ? `https://wa.me/${profile.whatsapp}` : undefined
  return (
    <section ref={ref} id="contact" aria-labelledby="contact-title" className="px-4 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div data-reveal>
          <SectionTitle id="contact-title">Let&apos;s <Em>work</Em> together</SectionTitle>
        </div>
        <div data-reveal className="mt-8">
          <Magnet><Button href={wa}>Chat di WhatsApp</Button></Magnet>
        </div>
        <ul data-reveal className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {socials.filter((s) => s.url).map((s) => (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-sky">
                {s.label} <ArrowUpRight size={16} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
