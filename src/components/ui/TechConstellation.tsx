import { lazy, Suspense } from 'react'
import { profile } from '../../data/profile'
import { ErrorBoundary } from './ErrorBoundary'
import { TechCard } from './TechCard'

// three.js hanya dimuat saat tab Tech Stack dibuka
const TechOrb = lazy(() => import('./TechOrb').then((m) => ({ default: m.TechOrb })))

// Empat kartu: Design digabung ke Frontend hanya di tampilan (data dan CV tetap lima kelompok)
const g = profile.skillGroups
const LEFT: [string, string[]][] = [
  ['Design & Frontend', [...g.Design, ...g.Frontend]],
  ['Backend', g.Backend],
]
const RIGHT: [string, string[]][] = [
  ['Mobile', g.Mobile],
  ['Tools', g.Tools],
]

export function TechConstellation() {
  return (
    <div className="grid items-center gap-8 md:grid-cols-[1fr_340px_1fr] md:gap-x-12">
      <div className="order-2 grid gap-6 md:order-none">
        {LEFT.map(([t, items]) => <TechCard key={t} title={t} items={items} side="left" />)}
      </div>
      <div className="relative order-1 h-60 md:order-none md:h-[340px]">
        <ErrorBoundary><Suspense fallback={null}>
          <TechOrb className="pointer-events-none absolute -inset-y-12 inset-x-0 md:-inset-14" />
        </Suspense></ErrorBoundary>
      </div>
      <div className="order-3 grid gap-6 md:order-none">
        {RIGHT.map(([t, items]) => <TechCard key={t} title={t} items={items} side="right" />)}
      </div>
    </div>
  )
}
