import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { Project } from '../../data/projects'
import { Tag } from './Tag'
import { TechIcon } from './TechIcon'

const btn = 'inline-flex size-11 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-sm transition-colors hover:border-sky hover:text-sky'

// Detail project: galeri gambar, judul di atas gambar yang memudar gelap, lalu artikel (details), teknologi, dan tautan
export function ProjectViewer({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [shot, setShot] = useState(0)

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    setShot(0)
    if (project && !d.open) d.showModal()
    if (!project && d.open) d.close()
  }, [project])

  const shots = project ? (project.gallery?.length ? project.gallery : project.image ? [project.image] : []) : []
  const go = (d: number) => setShot((i) => (i + d + shots.length) % shots.length)
  const onKey = (e: KeyboardEvent) => {
    if (shots.length < 2) return
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  return (
    <dialog
      ref={dialog}
      aria-label={project?.title ?? 'Project'}
      onKeyDown={onKey}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto max-h-[92vh] w-[min(94vw,920px)] overflow-y-auto rounded-3xl border border-white/15 bg-(--spotlight-card-surface) p-0 text-white [--spotlight-card-surface:color-mix(in_srgb,var(--color-white)_7%,var(--color-black))] backdrop:bg-black/85 backdrop:backdrop-blur-sm"
    >
      {project && (
        <article className="viewer-in">
          <div className="relative">
            {shots.length > 0 && (
              <img key={shots[shot]} src={shots[shot]} alt={`${project.title} ${shot + 1}`} className="viewer-img aspect-[16/8] w-full object-cover object-top" />
            )}
            <div aria-hidden className="cover-blur absolute inset-x-0 bottom-0 h-1/2" />
            <div aria-hidden className="cover-fade absolute inset-x-0 bottom-0 h-3/4" />
            <button type="button" aria-label="Close" onClick={onClose} className={`${btn} absolute top-4 right-4`}><X size={18} /></button>
            {shots.length > 1 && (
              <>
                <button type="button" aria-label="Previous image" onClick={() => go(-1)} className={`${btn} absolute top-1/3 left-4`}><ChevronLeft size={18} /></button>
                <button type="button" aria-label="Next image" onClick={() => go(1)} className={`${btn} absolute top-1/3 right-4`}><ChevronRight size={18} /></button>
              </>
            )}
            <h3 className="absolute bottom-3 left-6 text-2xl font-semibold md:left-8 md:text-3xl">{project.title}</h3>
          </div>

          <div className="px-6 pt-2 pb-8 md:px-8">
            <p className="text-white/80">{project.description}</p>
            {project.details?.map((t) => <p key={t} className="mt-4 text-white/70">{t}</p>)}

            {shots.length > 1 && (
              <ul className="mt-6 flex gap-2 overflow-x-auto">
                {shots.map((s, i) => (
                  <li key={s} className="shrink-0">
                    <button
                      type="button"
                      aria-label={`Image ${i + 1}`}
                      aria-current={i === shot}
                      onClick={() => setShot(i)}
                      className={`block overflow-hidden rounded-lg border transition-colors ${i === shot ? 'border-sky' : 'border-white/15 opacity-70 hover:opacity-100'}`}
                    >
                      <img src={s} alt="" loading="lazy" className="h-16 w-28 object-cover object-top" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((t) => <li key={t}><Tag><TechIcon name={t} />{t}</Tag></li>)}
            </ul>
            <div className="mt-6 flex gap-5 text-sm text-sky">
              {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">Demo</a>}
              {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>}
            </div>
          </div>
        </article>
      )}
    </dialog>
  )
}
