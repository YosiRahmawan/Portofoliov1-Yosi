import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { Project } from '../../data/projects'
import { Tag } from './Tag'
import { TechIcon } from './TechIcon'

const btn = 'inline-flex size-11 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-sm transition-colors hover:border-sky hover:text-sky'

// Detail project: galeri gambar (klik untuk layar penuh), judul di atas gambar yang memudar gelap, lalu artikel, teknologi, dan tautan
export function ProjectViewer({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const zoomDialog = useRef<HTMLDialogElement>(null)
  const [shot, setShot] = useState(0)
  const [zoom, setZoom] = useState(false)

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    setShot(0)
    setZoom(false)
    if (project && !d.open) d.showModal()
    if (!project && d.open) d.close()
  }, [project])

  useEffect(() => {
    const z = zoomDialog.current
    if (!z) return
    if (zoom && !z.open) z.showModal()
    if (!zoom && z.open) z.close()
  }, [zoom])

  const shots = project ? (project.gallery?.length ? project.gallery : project.image ? [project.image] : []) : []
  const go = (d: number) => setShot((i) => (i + d + shots.length) % shots.length)
  const onKey = (e: KeyboardEvent) => {
    if (shots.length < 2) return
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  return (
    <>
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
                <button type="button" aria-label="View image full size" onClick={() => setZoom(true)} className="group block w-full cursor-zoom-in">
                  <img key={shots[shot]} src={shots[shot]} alt={`${project.title} ${shot + 1}`} className="viewer-img aspect-[16/8] w-full object-cover object-top" />
                  <span aria-hidden className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs backdrop-blur-sm transition-opacity md:opacity-0 md:group-hover:opacity-100">
                    <Maximize2 size={14} /> Full size
                  </span>
                </button>
              )}
              <div aria-hidden className="cover-blur pointer-events-none absolute inset-x-0 bottom-0 h-1/2" />
              <div aria-hidden className="cover-fade pointer-events-none absolute inset-x-0 bottom-0 h-3/4" />
              <button type="button" aria-label="Close" onClick={onClose} className={`${btn} absolute top-4 right-4`}><X size={18} /></button>
              {shots.length > 1 && (
                <>
                  <button type="button" aria-label="Previous image" onClick={() => go(-1)} className={`${btn} absolute top-1/3 left-4`}><ChevronLeft size={18} /></button>
                  <button type="button" aria-label="Next image" onClick={() => go(1)} className={`${btn} absolute top-1/3 right-4`}><ChevronRight size={18} /></button>
                </>
              )}
              <h3 className="pointer-events-none absolute bottom-3 left-6 text-2xl font-semibold md:left-8 md:text-3xl">{project.title}</h3>
            </div>

            <div className="px-6 pt-2 pb-8 md:px-8">
              <p className="text-white/80">{project.description}</p>
              {project.role && (
                <div className="mt-6 rounded-xl border border-white/15 bg-white/5 p-4">
                  <p className="font-mono text-[11px] tracking-wider text-sky uppercase">My role</p>
                  <p className="mt-1 font-semibold">{project.role}</p>
                  {project.contributions && (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/70">
                      {project.contributions.map((c) => <li key={c}>{c}</li>)}
                    </ul>
                  )}
                </div>
              )}
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

      {/* layar penuh: dialog terpisah agar Esc hanya menutup gambar besar, bukan jendela detail */}
      <dialog
        ref={zoomDialog}
        aria-label="Image full size"
        onClose={() => setZoom(false)}
        onKeyDown={onKey}
        onClick={(e) => e.target === e.currentTarget && setZoom(false)}
        className="m-0 h-screen max-h-none w-screen max-w-none bg-black/95 p-0 text-white backdrop:bg-black"
      >
        {zoom && shots[shot] && (
          <div className="flex h-full w-full items-center justify-center p-4 md:p-8" onClick={(e) => e.target === e.currentTarget && setZoom(false)}>
            <img src={shots[shot]} alt={project ? `${project.title} ${shot + 1}` : ''} className="viewer-img max-h-full max-w-full rounded-lg object-contain" />
            <div className="absolute top-4 right-4 flex gap-2">
              {shots.length > 1 && (
                <>
                  <button type="button" aria-label="Previous image" onClick={() => go(-1)} className={btn}><ChevronLeft size={18} /></button>
                  <button type="button" aria-label="Next image" onClick={() => go(1)} className={btn}><ChevronRight size={18} /></button>
                </>
              )}
              <button type="button" aria-label="Close full size" onClick={() => setZoom(false)} className={btn}><X size={18} /></button>
            </div>
            <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white/80">{shot + 1} / {shots.length}</p>
          </div>
        )}
      </dialog>
    </>
  )
}
