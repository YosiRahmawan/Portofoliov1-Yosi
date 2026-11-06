import { useRef } from 'react'
import { profile } from '../../data/profile'
import { useSpotlight } from '../../hooks/useSpotlight'
import SplitText from '../reactbits/SplitText'
import { Button } from '../ui/Button'
import { DownloadCvButton } from '../ui/DownloadCvButton'
import { Em } from '../ui/Heading'
import { StatsArc } from '../ui/StatsArc'

const photo = 'absolute inset-0 bg-cover bg-no-repeat [background-position:center_18%]'

export function Hero() {
  const reveal = useRef<HTMLDivElement>(null)
  useSpotlight(reveal)
  const wa = profile.whatsapp ? `https://wa.me/${profile.whatsapp}?text=Hi%20${profile.name}` : undefined

  return (
    <section id="hero" className="relative isolate h-svh min-h-[640px] overflow-hidden hero-bg">
      <div className="hero-kenburns hero-frame">
        <div
          role="img"
          aria-label={`Photo of ${profile.name}`}
          className={photo}
          style={{ backgroundImage: 'url(/images/hero-base.webp)' }}
        />
        <div
          ref={reveal}
          aria-hidden
          className={`hero-reveal ${photo}`}
          style={{ backgroundImage: 'url(/images/hero-reveal.webp)' }}
        />
      </div>
      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

      <StatsArc />

      <div className="absolute bottom-12 left-5 z-40 max-w-[300px] sm:bottom-16 sm:left-8 sm:max-w-md md:bottom-20 md:left-12">
        <p className="hero-rise font-mono text-[11px] font-semibold tracking-[0.12em] text-white/90 sm:text-xs" style={{ animationDelay: '0.15s' }}>
          {profile.role.toUpperCase()}
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-6xl">
          <SplitText tag="span" text="Building" textAlign="left" />{' '}
          <Em>thoughtful</Em>
          <br />
          <SplitText tag="span" text="web experiences." textAlign="left" />
        </h1>
        <p className="hero-rise mt-4 text-sm leading-relaxed text-white/90 sm:text-base" style={{ animationDelay: '0.5s' }}>
          {profile.bio}
        </p>
        <div className="hero-rise mt-6 flex flex-wrap gap-3" style={{ animationDelay: '0.7s' }}>
          <Button variant="light" href={wa}>Contact me on WhatsApp</Button>
          <DownloadCvButton />
        </div>
      </div>
    </section>
  )
}
