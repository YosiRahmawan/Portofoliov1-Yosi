import type { KeyboardEvent } from 'react'

type Tab = { id: string; label: string }

export function Tabs({ tabs, value, onChange }: { tabs: Tab[]; value: string; onChange: (id: string) => void }) {
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    const i = tabs.findIndex((t) => t.id === value)
    const next = tabs[(i + step + tabs.length) % tabs.length].id
    onChange(next)
    document.getElementById(`tab-${next}`)?.focus()
  }

  return (
    <div role="tablist" aria-label="Portfolio content" onKeyDown={onKeyDown} className="inline-flex justify-center gap-1 rounded-full border border-white/20 p-1">
      {tabs.map((t) => {
        const on = t.id === value
        return (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            role="tab"
            type="button"
            aria-selected={on}
            aria-controls={`panel-${t.id}`}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(t.id)}
            className={`min-h-11 rounded-full px-3 text-[13px] font-medium sm:px-5 sm:text-sm transition-colors ${on ? 'bg-white text-black' : 'text-white/70 hover:text-white'}`}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
