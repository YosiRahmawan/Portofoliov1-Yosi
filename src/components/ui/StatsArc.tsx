import type { CSSProperties } from 'react'
import { profile } from '../../data/profile'

// Pusat busur di luar kanvas kiri, sehingga busur menyapu masuk dari arah subjek
const CX = -110
const CY = 300
const ARCS = [
  { r: 330, from: -92, to: 16, dot: -46 },
  { r: 395, from: -56, to: 60, dot: 2 },
  { r: 460, from: -14, to: 72, dot: 44 },
]

const rad = (d: number) => (d * Math.PI) / 180
const at = (r: number, d: number) => [CX + r * Math.cos(rad(d)), CY + r * Math.sin(rad(d))]
const vars = (v: Record<string, string | number>) => v as CSSProperties

export function StatsArc() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 z-30 hidden sm:block" aria-hidden>
      <svg viewBox="0 0 380 700" preserveAspectRatio="xMaxYMid meet" className="h-full w-auto text-white">
        <defs>
          {ARCS.map((a, i) => {
            const [x1, y1] = at(a.r, a.from)
            const [x2, y2] = at(a.r, a.to)
            return (
              <linearGradient key={i} id={`arc-g${i}`} gradientUnits="userSpaceOnUse" x1={x1} y1={y1} x2={x2} y2={y2}>
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.22" stopColor="#fff" stopOpacity="0.5" />
                <stop offset="0.55" stopColor="#fff" stopOpacity="0.5" />
                <stop offset="0.85" stopColor="#fff" stopOpacity="0.1" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            )
          })}
        </defs>
        {ARCS.map((a, i) => {
          const stat = profile.stats[i]
          const [x1, y1] = at(a.r, a.from)
          const [x2, y2] = at(a.r, a.to)
          const [dx, dy] = at(a.r, a.dot)
          const len = a.r * rad(a.to - a.from)
          const lineDelay = 0.4 + i * 0.22
          const markDelay = lineDelay + 0.9
          return (
            <g key={i}>
              <path
                d={`M ${x1} ${y1} A ${a.r} ${a.r} 0 0 1 ${x2} ${y2}`}
                fill="none"
                stroke={`url(#arc-g${i})`}
                strokeWidth="1.1"
                className="arc-line"
                style={vars({ '--len': len, '--d': `${lineDelay}s` })}
              />
              <circle cx={dx} cy={dy} r="3.4" fill="#fff" className="arc-dot" style={vars({ '--d': `${markDelay}s` })} />
              <circle cx={dx} cy={dy} r="7" fill="none" stroke="#fff" strokeOpacity="0.35" className="arc-ring" style={vars({ '--d': `${markDelay + 0.3}s` })} />
              <text x={dx + 16} y={dy + 4} fill="#fff" fontSize="32" letterSpacing="-1" className="arc-text" style={vars({ '--d': `${markDelay + 0.15}s` })}>
                {stat.value}
                {stat.suffix && <tspan fontSize="19" dy="-10">{stat.suffix}</tspan>}
              </text>
              <text x={dx + 18} y={dy + 22} fill="#fff" fillOpacity="0.8" fontSize="8.5" fontWeight="600" letterSpacing="2" className="arc-text" style={vars({ '--d': `${markDelay + 0.3}s` })}>
                {stat.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
