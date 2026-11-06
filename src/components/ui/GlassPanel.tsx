import type { ReactNode } from 'react'

export function GlassPanel({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={`rounded-2xl border border-white/25 bg-white/12 backdrop-blur-md md:backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  )
}
