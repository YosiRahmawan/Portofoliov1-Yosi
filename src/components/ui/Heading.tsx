import type { ReactNode } from 'react'

// Judul campuran: teks sans tebal, kata penekan serif italic
export function Em({ children }: { children: ReactNode }) {
  return <span className="font-serif font-normal italic">{children}</span>
}

export function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="text-[clamp(1.75rem,4vw,3.5rem)] font-bold leading-none tracking-tight">
      {children}
    </h2>
  )
}
