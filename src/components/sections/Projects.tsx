import { useEffect, useRef, useState } from 'react'
import { certificates } from '../../data/certificates'
import { projects, type Project } from '../../data/projects'
import { useReveal } from '../../hooks/useReveal'
import RubberSegment from '../reactbits/RubberSegment'
import SpotlightCard from '../reactbits/SpotlightCard'
import { Carousel } from '../ui/Carousel'
import { CertificateGrid } from '../ui/CertificateGrid'
import { CertificateViewer } from '../ui/CertificateViewer'
import { Em, SectionTitle } from '../ui/Heading'
import { ProjectViewer } from '../ui/ProjectViewer'
import { Tag } from '../ui/Tag'
import { TechConstellation } from '../ui/TechConstellation'
import { TechIcon } from '../ui/TechIcon'

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
  const [viewing, setViewing] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [openProject, setOpenProject] = useState<Project | null>(null)
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
                      <div className="flex h-full flex-col">
                        {p.image && (
                          <div className="relative -mx-8 -mt-8">
                            <img src={p.cover ?? p.image} alt={p.title} loading="lazy" className="aspect-video w-full object-cover" />
                            <div aria-hidden className="cover-blur absolute inset-x-0 bottom-0 h-1/2" />
                            <div aria-hidden className="cover-fade absolute inset-x-0 bottom-0 h-3/4" />
                          </div>
                        )}
                        <h3 className={`text-xl font-semibold ${p.image ? 'relative -mt-8' : ''}`}>{p.title}</h3>
                        <p className="mt-2 line-clamp-4 text-white/70">{p.description}</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {p.tech.map((t) => <li key={t}><Tag><TechIcon name={t} />{t}</Tag></li>)}
                        </ul>
                        <div className="mt-auto flex gap-4 pt-5 text-sm">
                          {(p.gallery?.length || p.details?.length) && <button type="button" onClick={() => setOpenProject(p)} className={link}>Details</button>}
                          {p.demoUrl && <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className={link}>Demo</a>}
                          {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className={link}>GitHub</a>}
                        </div>
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
                      <div className="flex h-full flex-col">
                        {c.image && <img src={c.image} alt={c.title} loading="lazy" className="mb-4 aspect-[1.41] w-full rounded-lg object-cover" />}
                        <h3 className="text-xl font-semibold">{c.title}</h3>
                        <p className="mt-2 text-white/70">{c.issuer} · {c.year}</p>
                        <button type="button" onClick={() => setViewing(certificates.indexOf(c))} className={`mt-auto self-start pt-5 text-sm ${link}`}>View certificate</button>
                      </div>
                    </SpotlightCard>
                  </li>
                ))}
              </Carousel>
            ))}

          {tab === 'certificates' && certificates.length > 0 && (
            <div className="mt-8 text-center">
              <button
                type="button"
                aria-expanded={showAll}
                onClick={() => setShowAll((v) => !v)}
                className="inline-flex min-h-11 items-center rounded-full border border-white/25 px-6 text-sm font-medium transition-colors hover:border-sky hover:text-sky"
              >
                {showAll ? 'Hide all certificates' : `View all ${certificates.length} certificates`}
              </button>
              {showAll && <CertificateGrid items={certificates} onOpen={setViewing} />}
            </div>
          )}

          {tab === 'stack' && <TechConstellation />}
        </div>
          </div>
        </div>
      </div>
      <CertificateViewer items={certificates} index={viewing} onChange={setViewing} />
      <ProjectViewer project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  )
}
