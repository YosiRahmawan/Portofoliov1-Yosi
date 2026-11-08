import StaggeredMenu from '../reactbits/StaggeredMenu'
import { socials } from '../../data/socials'
import { GlassPanel } from '../ui/GlassPanel'

export const links = [
  ['About', '#about'],
  ['Projects', '#projects'],
  ['Journey', '#journey'],
  ['Contact', '#contact'],
]

export function Navbar() {
  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 hidden px-4 md:block">
        <GlassPanel className="mx-auto flex max-w-3xl items-center justify-between px-5 py-2">
          <a href="#hero" className="font-bold tracking-tight">yosi.dev</a>
          <nav aria-label="Main" className="flex gap-6 text-sm">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="hover:text-sky">{label}</a>
            ))}
          </nav>
        </GlassPanel>
      </header>
      {/* di HP: menu geser dari samping (React Bits StaggeredMenu); warna tombol harus string literal karena dianimasikan GSAP */}
      <div className="md:hidden">
        <StaggeredMenu
          isFixed
          displayItemNumbering={false}
          logoText="yosi.dev"
          items={links.map(([label, link]) => ({ label, link, ariaLabel: `Go to ${label}` }))}
          socialItems={socials.filter((s) => s.url).map((s) => ({ label: s.label, link: s.url }))}
          colors={['#0a0a0a', '#2563eb']}
          accentColor="#2563eb"
          menuButtonColor="#ffffff"
          openMenuButtonColor="#000000"
        />
      </div>
    </>
  )
}
