import { profile } from '../../data/profile'
import SplitText from '../reactbits/SplitText'
import { Button } from '../ui/Button'
import { DownloadCvButton } from '../ui/DownloadCvButton'
import { Em } from '../ui/Heading'
import { GlassPanel } from '../ui/GlassPanel'

export function Hero() {
  const wa = profile.whatsapp ? `https://wa.me/${profile.whatsapp}?text=Halo%20${profile.name}` : undefined
  return (
    <section id="hero" className="relative flex min-h-svh items-center overflow-hidden bg-blue px-4 pt-24 pb-16 sm:px-8">
      <div className="mx-auto w-full max-w-[1200px]">
        <p className="mb-6 font-mono text-sm text-white/80">{profile.role}</p>
        <h1 className="text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.95] tracking-[-0.03em]">
          <SplitText tag="span" text="Building" />{' '}
          <Em>thoughtful</Em>
          <br />
          <SplitText tag="span" text="web experiences." />
        </h1>
        <p className="mt-8 max-w-xl text-lg text-white/85">{profile.bio}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={wa}>Hubungi via WhatsApp</Button>
          <DownloadCvButton />
        </div>
        <GlassPanel className="mt-12 inline-block px-5 py-3 text-sm sm:absolute sm:right-8 sm:bottom-12 sm:mt-0">
          Open for freelance
        </GlassPanel>
      </div>
    </section>
  )
}
