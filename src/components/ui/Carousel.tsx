import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, type ReactNode } from 'react'

// Anak <li> diberi lebar sendiri; baris digeser dengan swipe/trackpad atau tombol panah
export function Carousel({ children }: { children: ReactNode }) {
  const row = useRef<HTMLUListElement>(null)
  const go = (dir: number) => row.current?.scrollBy({ left: dir * row.current.clientWidth * 0.8, behavior: 'smooth' })
  const arrow = 'inline-flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-sky hover:text-sky'

  return (
    <div>
      <ul ref={row} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {children}
      </ul>
      <div className="mt-4 flex justify-end gap-2">
        <button type="button" aria-label="Previous" onClick={() => go(-1)} className={arrow}><ChevronLeft size={18} /></button>
        <button type="button" aria-label="Next" onClick={() => go(1)} className={arrow}><ChevronRight size={18} /></button>
      </div>
    </div>
  )
}
