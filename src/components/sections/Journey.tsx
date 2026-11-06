import { useRef } from 'react'
import { journey } from '../../data/journey'
import { useReveal } from '../../hooks/useReveal'
import { Em, SectionTitle } from '../ui/Heading'

export function Journey() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section ref={ref} id="journey" aria-labelledby="journey-title" className="bg-white px-4 py-16 text-black sm:px-8 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div data-reveal>
          <SectionTitle id="journey-title">My <Em>journey</Em></SectionTitle>
        </div>
        <ol className="mt-10 border-l border-black/15">
          {journey.map((j) => (
            <li key={j.title + j.period} data-reveal className="relative pb-10 pl-8 last:pb-0">
              <span className="absolute top-2 -left-[5px] size-2.5 rounded-full bg-blue" />
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
