import type { ReactNode } from 'react'

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-current/25 px-3 py-1 font-mono text-xs">{children}</span>
  )
}
