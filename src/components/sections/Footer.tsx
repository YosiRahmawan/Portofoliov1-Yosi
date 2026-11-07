import { ArrowUp } from 'lucide-react'
import { profile } from '../../data/profile'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="flex items-center justify-between border-t border-white/15 px-4 py-6 text-sm text-white/60 sm:px-8">
      <p>© {year} {profile.name}</p>
      <a href="#hero" aria-label="Back to top" className="inline-flex min-h-11 min-w-11 items-center justify-center hover:text-sky">
        <ArrowUp size={18} />
      </a>
    </footer>
  )
}
