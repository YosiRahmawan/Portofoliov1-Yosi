import { ChevronLeft, ChevronRight, Download, Maximize2, Minimize2, X } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { Certificate } from '../../data/certificates'

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const btn = 'inline-flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-sky hover:text-sky'

// Penampil sertifikat: <dialog> modal (fokus dan Esc ditangani browser) + layar penuh + unduh + panah antar sertifikat
export function CertificateViewer({
  items,
  index,
  onChange,
}: {
  items: Certificate[]
  index: number | null
  onChange: (i: number | null) => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [full, setFull] = useState(false)
  const canFullscreen = typeof document !== 'undefined' && document.fullscreenEnabled

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (index !== null && !d.open) d.showModal()
    if (index === null && d.open) d.close()
  }, [index])

  useEffect(() => {
    const sync = () => setFull(document.fullscreenElement === stage.current)
    document.addEventListener('fullscreenchange', sync)
    return () => document.removeEventListener('fullscreenchange', sync)
  }, [])

  const item = index !== null ? items[index] : null
  const go = (d: number) => index !== null && onChange((index + d + items.length) % items.length)
  const toggleFull = () => (document.fullscreenElement ? document.exitFullscreen() : stage.current?.requestFullscreen())
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  return (
    <dialog
      ref={dialog}
      aria-label={item?.title ?? 'Certificate'}
      onKeyDown={onKey}
      onClose={() => {
        if (document.fullscreenElement) document.exitFullscreen()
        onChange(null)
      }}
      onClick={(e) => e.target === e.currentTarget && onChange(null)}
      className="m-auto max-h-none max-w-none bg-transparent p-0 text-white backdrop:bg-black/85 backdrop:backdrop-blur-sm"
    >
      {item && (
        <div ref={stage} className={`viewer-in flex flex-col gap-3 ${full ? 'h-screen w-screen bg-black p-4' : 'w-[min(94vw,1100px)]'}`}>
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{item.title}</p>
              <p className="truncate text-xs text-white/60">{item.issuer} · {item.year} · {(index ?? 0) + 1}/{items.length}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button type="button" aria-label="Previous certificate" onClick={() => go(-1)} className={btn}><ChevronLeft size={18} /></button>
              <button type="button" aria-label="Next certificate" onClick={() => go(1)} className={btn}><ChevronRight size={18} /></button>
              <a href={item.image} download={`${slug(item.title)}.webp`} aria-label="Download certificate" className={btn}><Download size={18} /></a>
              {canFullscreen && (
                <button type="button" aria-label={full ? 'Exit full screen' : 'Full screen'} onClick={toggleFull} className={btn}>
                  {full ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
              )}
              <button type="button" aria-label="Close" onClick={() => onChange(null)} className={btn}><X size={18} /></button>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <img
              key={item.image}
              src={item.image}
              alt={item.title}
              className={`viewer-img rounded-lg bg-white object-contain ${full ? 'max-h-full max-w-full' : 'max-h-[78vh] max-w-full'}`}
            />
          </div>
        </div>
      )}
    </dialog>
  )
}
