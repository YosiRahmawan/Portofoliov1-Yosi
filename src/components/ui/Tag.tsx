import type { ReactNode } from 'react'

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-current/25 px-3 py-1 font-mono text-xs">{children}</span>
  )
}
