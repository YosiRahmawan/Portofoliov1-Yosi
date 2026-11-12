import { useGSAP } from '@gsap/react'
import { Briefcase, GraduationCap } from 'lucide-react'
import { useRef } from 'react'
import { journey } from '../../data/journey'
import { useReveal } from '../../hooks/useReveal'
import { useTimelineProgress } from '../../hooks/useTimelineProgress'
import { gsap } from '../../lib/gsap'
import { Em, SectionTitle } from '../ui/Heading'

const year = (period: string) => period.match(/\d{4}/)?.[0] ?? ''

export function Journey() {
  const ref = useRef<HTMLElement>(null)
  const list = useRef<HTMLOListElement>(null)
  useReveal(ref)
  useTimelineProgress(list)

  // kartu masuk dari sisinya; angka tahun besar bergeser pelan (parallax). Hanya transform dan opacity.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const wide = matchMedia('(min-width: 768px)').matches
        gsap.utils.toArray<HTMLElement>('[data-item]').forEach((li) => {
          const card = li.querySelector('[data-card]')
          const ghost = li.querySelector('[data-ghost]')
          const dir = li.dataset.side === 'l' ? -1 : 1
          gsap.from(card, {
            x: wide ? dir * 70 : 0,
            y: wide ? 0 : 36,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: li, start: 'top 85%' },
          })
          if (ghost && wide) {
            gsap.fromTo(ghost, { y: 70 }, { y: -70, ease: 'none', scrollTrigger: { trigger: li, start: 'top bottom', end: 'bottom top', scrub: true } })
          }
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="journey" aria-labelledby="journey-title" className="overflow-hidden bg-white px-4 py-16 text-black sm:px-8 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div data-reveal className="text-center">
          <SectionTitle id="journey-title">My <Em>journey</Em></SectionTitle>
        </div>
        <ol ref={list} className="relative mt-14 md:mt-20">
          <span aria-hidden className="absolute top-0 left-0 h-full w-px bg-black/15 md:left-1/2" />
          <span
            data-fill
            aria-hidden
            className="absolute top-0 -left-px h-full w-[3px] origin-top rounded-full bg-blue shadow-[0_0_14px_color-mix(in_srgb,var(--color-sky)_80%,transparent)] [transform:scaleY(0)] will-change-transform md:left-[calc(50%-1px)]"
          />
          {journey.map((j, i) => {
            const left = i % 2 === 0
            const Icon = j.type === 'education' ? GraduationCap : Briefcase
            const ongoing = j.period.includes('Present')
            return (
              <li
                key={j.title + j.period}
                data-item
                data-side={left ? 'l' : 'r'}
                className={`group/li relative pb-12 pl-8 last:pb-0 md:w-1/2 md:pb-20 ${left ? 'md:pr-14 md:pl-0' : 'md:ml-auto md:pl-14'}`}
              >
                <span
                  data-dot
                  aria-hidden
                  className={`group/dot absolute top-7 -left-[6px] size-3 rounded-full border-2 border-black/20 bg-white transition-[background-color,border-color,transform] duration-300 data-[on]:scale-125 data-[on]:border-blue data-[on]:bg-blue ${left ? 'md:-right-[6px] md:left-auto' : 'md:-left-[6px]'}`}
                >
                  <span className="absolute -inset-1.5 hidden rounded-full border border-blue [animation:pulseRing_2s_ease-out_infinite] group-data-[on]/dot:block motion-reduce:hidden" />
                </span>

                <span
                  aria-hidden
                  data-ghost
                  className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 select-none font-serif text-[clamp(5rem,11vw,9rem)] leading-none text-transparent italic [-webkit-text-stroke:1.5px_color-mix(in_srgb,var(--color-blue)_28%,transparent)] md:block ${left ? 'left-[calc(100%+3.5rem)]' : 'right-[calc(100%+3.5rem)]'}`}
                >
                  {year(j.period)}
                </span>

                <div
                  data-card
                  className="relative rounded-2xl border border-black/10 bg-linear-to-br from-white to-blue/[0.04] p-6 shadow-[0_18px_50px_-28px_rgb(0_0_0/0.35)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 group-has-[[data-on]]/li:border-blue/40 group-has-[[data-on]]/li:shadow-[0_22px_60px_-26px_color-mix(in_srgb,var(--color-blue)_55%,transparent)]"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="inline-flex size-9 items-center justify-center rounded-full bg-blue/10 text-blue">
                      <Icon size={18} aria-hidden />
                    </span>
                    <p className="font-mono text-sm text-black/60">{j.period}</p>
                    {ongoing && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue/10 px-2.5 py-1 text-xs font-medium text-blue">
                        <span aria-hidden className="size-1.5 rounded-full bg-blue [animation:pulseRing_1.6s_ease-out_infinite] motion-reduce:animate-none" />
                        Ongoing
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight md:text-2xl">{j.title}</h3>
                  <p className="mt-1 text-black/70">{j.place}</p>
                  <p className="mt-3 text-black/80">{j.description}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
