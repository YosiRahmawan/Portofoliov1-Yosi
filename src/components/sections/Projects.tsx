import { useRef } from 'react'
import { projects } from '../../data/projects'
import { useReveal } from '../../hooks/useReveal'
import SpotlightCard from '../reactbits/SpotlightCard'
import { Em, SectionTitle } from '../ui/Heading'
import { Tag } from '../ui/Tag'

export function Projects() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section ref={ref} id="projects" aria-labelledby="projects-title" className="px-4 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div data-reveal>
          <SectionTitle id="projects-title">Selected <Em>projects</Em></SectionTitle>
        </div>
        {projects.length === 0 ? (
          <p data-reveal className="mt-10 text-white/70">Project segera hadir.</p>
        ) : (
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <li key={p.title} data-reveal>
                <SpotlightCard className="h-full">
                  {p.image && <img src={p.image} alt={p.title} loading="lazy" className="mb-4 aspect-video w-full rounded-lg object-cover" />}
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-white/70">{p.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => <li key={t}><Tag>{t}</Tag></li>)}
                  </ul>
                  <div className="mt-5 flex gap-4 text-sm">
                    {p.demoUrl && <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="text-sky hover:underline">Demo</a>}
                    {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="text-sky hover:underline">Code</a>}
                  </div>
                </SpotlightCard>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
