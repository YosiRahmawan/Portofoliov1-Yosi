import { useEffect, useRef, useState } from 'react'
import { certificates } from '../../data/certificates'
import { projects } from '../../data/projects'
import { useReveal } from '../../hooks/useReveal'
import RubberSegment from '../reactbits/RubberSegment'
import SpotlightCard from '../reactbits/SpotlightCard'
import { Carousel } from '../ui/Carousel'
import { Em, SectionTitle } from '../ui/Heading'
import { Tag } from '../ui/Tag'
import { TechConstellation } from '../ui/TechConstellation'

const TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'stack', label: 'Tech Stack' },
]
const slide = 'w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[32%]'
const link = 'text-sky hover:underline'

export function Projects() {
  const ref = useRef<HTMLElement>(null)
  const [tab, setTab] = useState('projects')
  const content = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>()
  // tinggi area konten mengikuti isi tab agar perpindahan tab tidak melompat
  useEffect(() => {
    const el = content.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setHeight(e.contentRect.height))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  useReveal(ref)

  return (
    <section ref={ref} id="projects" aria-labelledby="projects-title" className="px-4 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div data-reveal className="text-center">
          <SectionTitle id="projects-title">Selected <Em>work</Em></SectionTitle>
          <div className="mt-8">
            <RubberSegment
              items={TABS.map((t) => ({ value: t.id, label: t.label }))}
              value={tab}
              onChange={setTab}
              size="lg"
              radius={22}
              aria-label="Portfolio content"
              trackColor="color-mix(in srgb, var(--color-white) 10%, transparent)"
              thumbColor="var(--color-white)"
              textColor="var(--color-white)"
              activeTextColor="var(--color-black)"
            />
          </div>
        </div>

        <div className="-mx-1 mt-10 overflow-hidden px-1 transition-[height] duration-300 ease-out motion-reduce:transition-none" style={{ height }}>
          <div ref={content}>
        <div key={tab} role="group" aria-label={TABS.find((t) => t.id === tab)?.label} className="tab-in">
          {tab === 'projects' &&
            (projects.length === 0 ? (
              <p className="text-center text-white/70">Project segera hadir.</p>
            ) : (
              <Carousel>
                {projects.map((p) => (
                  <li key={p.title} className={slide}>
                    <SpotlightCard className="h-full">
                      {p.image && <img src={p.image} alt={p.title} loading="lazy" className="mb-4 aspect-video w-full rounded-lg object-cover" />}
                      <h3 className="text-xl font-semibold">{p.title}</h3>
                      <p className="mt-2 text-white/70">{p.description}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {p.tech.map((t) => <li key={t}><Tag>{t}</Tag></li>)}
                      </ul>
                      <div className="mt-5 flex gap-4 text-sm">
                        {p.demoUrl && <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className={link}>Demo</a>}
                        {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className={link}>Code</a>}
                      </div>
                    </SpotlightCard>
                  </li>
                ))}
              </Carousel>
            ))}

          {tab === 'certificates' &&
            (certificates.length === 0 ? (
              <p className="text-center text-white/70">Sertifikat segera hadir.</p>
            ) : (
              <Carousel>
                {certificates.map((c) => (
                  <li key={c.title + c.year} className={slide}>
                    <SpotlightCard className="h-full">
                      {c.image && <img src={c.image} alt={c.title} loading="lazy" className="mb-4 aspect-[4/3] w-full rounded-lg object-cover" />}
                      <h3 className="text-xl font-semibold">{c.title}</h3>
                      <p className="mt-2 text-white/70">{c.issuer} · {c.year}</p>
                      {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer" className={`mt-5 inline-block text-sm ${link}`}>View credential</a>}
                    </SpotlightCard>
                  </li>
                ))}
              </Carousel>
            ))}

          {tab === 'stack' && <TechConstellation />}
        </div>
          </div>
        </div>
      </div>
    </section>
  )
}
