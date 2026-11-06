import SpecularButton from '../reactbits/SpecularButton'
import { Tag } from './Tag'
import { TechIcon } from './TechIcon'

// Kartu satu kategori memakai efek SpecularButton (React Bits); bukan tombol sungguhan, jadi tidak bisa difokus.
// Di md ke atas ada garis menyala ke arah bola di tengah.
export function TechCard({ title, items, side }: { title: string; items: string[]; side: 'left' | 'right' }) {
  const line =
    side === 'left'
      ? 'left-full bg-gradient-to-r from-sky/70 to-sky/0'
      : 'right-full bg-gradient-to-l from-sky/70 to-sky/0'
  const dot = side === 'left' ? '-right-[3px]' : '-left-[3px]'
  return (
    <div className="relative z-10">
      <SpecularButton
        tabIndex={-1}
        radius={16}
        tintOpacity={0.05}
        blur={12}
        textColor="var(--color-white)"
        autoAnimate
        className="w-full cursor-default! justify-start! px-5! py-5! text-left! text-sm! active:scale-100!"
      >
        <span className="block text-left">
          <span className="block text-sm font-semibold">{title}</span>
          <span className="mt-3 flex flex-wrap gap-2">
            {items.map((s) => <Tag key={s}><TechIcon name={s} />{s}</Tag>)}
          </span>
        </span>
      </SpecularButton>
      <span aria-hidden className={`pointer-events-none absolute top-1/2 hidden h-px w-32 md:block ${line}`} />
      <span aria-hidden className={`pointer-events-none absolute top-1/2 hidden size-1.5 -translate-y-1/2 rounded-full bg-sky shadow-[0_0_8px_var(--color-sky)] md:block ${dot}`} />
    </div>
  )
}
