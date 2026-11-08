import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import { ErrorBoundary } from './ErrorBoundary'

const GlowCursor = lazy(() => import('../reactbits/GlowCursor'))
const KEY = 'glow-cursor'

// Efek kursor hanya untuk perangkat dengan mouse; layar sentuh tidak punya kursor dan WebGL-nya memakan baterai.
// Pengunjung bisa mematikannya; pilihan diingat di browser.
export function GlowZone({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [available, setAvailable] = useState(false)
  const [on, setOn] = useState(true)
  useEffect(() => {
    setAvailable(matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches)
    try {
      setOn(localStorage.getItem(KEY) !== 'off')
    } catch {
      // penyimpanan diblokir: efek tetap menyala sampai halaman ditutup
    }
  }, [])

  function toggle() {
    setOn(!on)
    try {
      localStorage.setItem(KEY, on ? 'off' : 'on')
    } catch {
      // abaikan
    }
  }

  return (
    <div className={`relative ${className}`}>
      {children}
      {available && on && (
        <ErrorBoundary>
          <Suspense fallback={null}>
            <GlowCursor quality="medium" className="pointer-events-none z-10" style={{ position: 'absolute', inset: 0 }} />
          </Suspense>
        </ErrorBoundary>
      )}
      {available && (
        <button
          type="button"
          aria-pressed={on}
          onClick={toggle}
          className="absolute right-4 bottom-4 z-20 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 text-xs font-medium text-white backdrop-blur hover:border-sky sm:right-8"
        >
          <span aria-hidden className={`size-2 rounded-full ${on ? 'bg-sky' : 'bg-white/40'}`} />
          Cursor glow: {on ? 'On' : 'Off'}
        </button>
      )}
    </div>
  )
}
