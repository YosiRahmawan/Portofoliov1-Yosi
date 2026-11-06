import { ArrowUp } from 'lucide-react'
import { profile } from '../../data/profile'

export function Footer() {
  return (
    <footer className="flex items-center justify-between border-t border-white/15 px-4 py-6 text-sm text-white/60 sm:px-8">
      <p>© {new Date().getFullYear()} {profile.name}</p>
      <a href="#hero" aria-label="Kembali ke atas" className="inline-flex min-h-11 min-w-11 items-center justify-center hover:text-sky">
        <ArrowUp size={18} />
      </a>
    </footer>
  )
}
