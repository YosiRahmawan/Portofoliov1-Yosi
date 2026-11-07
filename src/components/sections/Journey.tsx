import { useRef } from 'react'
import { journey } from '../../data/journey'
import { useReveal } from '../../hooks/useReveal'
import { useTimelineProgress } from '../../hooks/useTimelineProgress'
import { Em, SectionTitle } from '../ui/Heading'

export function Journey() {
  const ref = useRef<HTMLElement>(null)
  const list = useRef<HTMLOListElement>(null)
  useReveal(ref)
  useTimelineProgress(list)
  return (
    <section ref={ref} id="journey" aria-labelledby="journey-title" className="bg-white px-4 py-16 text-black sm:px-8 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div data-reveal>
          <SectionTitle id="journey-title">My <Em>journey</Em></SectionTitle>
        </div>
        <ol ref={list} className="relative mt-10">
          <span aria-hidden className="absolute top-0 left-0 h-full w-px bg-black/15" />
          <span
            data-fill
            aria-hidden
            className="absolute top-0 -left-px h-full w-[3px] origin-top rounded-full bg-blue shadow-[0_0_10px_color-mix(in_srgb,var(--color-sky)_70%,transparent)] [transform:scaleY(0)] will-change-transform"
          />
          {journey.map((j) => (
            <li key={j.title + j.period} data-reveal className="relative pb-10 pl-8 last:pb-0">
              <span
                data-dot
                aria-hidden
                className="absolute top-2 -left-[6px] size-3 rounded-full border-2 border-black/20 bg-white transition-[background-color,border-color,transform,box-shadow] duration-300 data-[on]:scale-125 data-[on]:border-blue data-[on]:bg-blue data-[on]:shadow-[0_0_0_5px_color-mix(in_srgb,var(--color-blue)_18%,transparent)]"
              />
              <p className="font-mono text-sm text-black/60">{j.period}</p>
              <h3 className="text-xl font-semibold">{j.title}</h3>
              <p className="text-black/70">{j.place}</p>
              <p className="mt-2 max-w-xl">{j.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
