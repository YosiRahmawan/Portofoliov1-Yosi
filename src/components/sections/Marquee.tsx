import { profile } from '../../data/profile'
import ScrollVelocity from '../reactbits/ScrollVelocity'
import { Em } from '../ui/Heading'

const gap = <span aria-hidden className="inline-block w-10 md:w-16" />

// Teks berjalan; arah dan kecepatannya berubah mengikuti arah scroll (komponen React Bits)
export function Marquee() {
  return (
    <section aria-label={`Hi, I'm ${profile.name}. UI/UX Designer and ${profile.role}.`} className="overflow-hidden py-6 text-white md:py-8">
      <ScrollVelocity
        texts={[
          <>
            Hi, I’m <Em>{profile.name}</Em>
            {gap}
            <span className="text-white/50">UI/UX Designer</span>
            {gap}
            <span className="text-white/50">{profile.role}</span>
            {gap}
          </>,
        ]}
        velocity={55}
        skewWithVelocity={8}
        pauseOnHover
        fontSize="clamp(1.5rem, 3vw, 2.5rem)"
        scrollerStyle={{ lineHeight: 1.3 }}
      />
    </section>
  )
}
