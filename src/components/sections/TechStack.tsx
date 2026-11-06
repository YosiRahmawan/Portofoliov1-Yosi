import { useRef } from 'react'
import { profile } from '../../data/profile'
import { useReveal } from '../../hooks/useReveal'
import { Em, SectionTitle } from '../ui/Heading'
import { Tag } from '../ui/Tag'

export function TechStack() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section ref={ref} id="stack" aria-labelledby="stack-title" className="px-4 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div data-reveal>
          <SectionTitle id="stack-title">Tech <Em>stack</Em></SectionTitle>
        </div>
        <dl className="mt-10 grid gap-8 sm:grid-cols-2">
          {Object.entries(profile.skillGroups).map(([group, items]) => (
            <div key={group} data-reveal>
              <dt className="font-mono text-xs uppercase tracking-wider text-white/60">{group}</dt>
              <dd className="mt-3">
                <ul className="flex flex-wrap gap-2">
                  {items.map((s) => <li key={s}><Tag>{s}</Tag></li>)}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
