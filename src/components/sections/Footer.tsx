import { ArrowUp } from 'lucide-react'
import { profile } from '../../data/profile'
import { socials } from '../../data/socials'
import { links } from './Navbar'

const year = new Date().getFullYear()
const col = 'text-xs font-semibold tracking-[0.12em] text-white/50 uppercase'
const item = 'inline-flex min-h-11 items-center hover:text-sky'

export function Footer() {
  return (
    <footer className="border-t border-white/15 px-4 pt-12 pb-6 sm:px-8">
      <div className="mx-auto grid max-w-[1200px] gap-10 text-sm text-white/70 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold text-white">{profile.name}</p>
          <p className="mt-1">{profile.role}</p>
          <p className="mt-4 max-w-xs">{profile.availability}</p>
        </div>
        <nav aria-label="Footer">
          <p className={col}>Navigasi</p>
          <ul className="mt-2">
            {links.map(([label, href]) => (
              <li key={href}><a href={href} className={item}>{label}</a></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className={col}>Sosial</p>
          <ul className="mt-2">
            {socials.filter((s) => s.url).map((s) => (
              <li key={s.label}><a href={s.url} target="_blank" rel="noopener noreferrer" className={item}>{s.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-[1200px] items-center justify-between border-t border-white/10 pt-4 text-xs text-white/50">
        <p>© {year} {profile.name}. Dibuat dengan React, TypeScript, Tailwind, dan GSAP.</p>
        <a href="#hero" aria-label="Back to top" className="inline-flex min-h-11 min-w-11 items-center justify-center hover:text-sky">
          <ArrowUp size={18} />
        </a>
      </div>
    </footer>
  )
}
