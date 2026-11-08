import { GlassPanel } from '../ui/GlassPanel'

export const links = [
  ['About', '#about'],
  ['Projects', '#projects'],
  ['Journey', '#journey'],
  ['Contact', '#contact'],
]

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <GlassPanel className="mx-auto flex max-w-3xl items-center justify-between px-5 py-2">
        <a href="#hero" className="font-bold tracking-tight">yosi.dev</a>
        <nav aria-label="Main" className="flex gap-4 text-sm sm:gap-6">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-sky">{label}</a>
          ))}
        </nav>
      </GlassPanel>
    </header>
  )
}
