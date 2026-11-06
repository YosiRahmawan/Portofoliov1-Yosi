import { useRef } from 'react'
import { profile } from '../../data/profile'
import { useReveal } from '../../hooks/useReveal'
import { Em, SectionTitle } from '../ui/Heading'
import { Tag } from '../ui/Tag'

export function About() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section ref={ref} id="about" aria-labelledby="about-title" className="bg-white px-4 py-16 text-black sm:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[1fr_2fr]">
        <div data-reveal>
          <SectionTitle id="about-title">About <Em>me</Em></SectionTitle>
          {profile.photo && (
            <img
              src={profile.photo}
              alt={`Foto ${profile.name}`}
              loading="lazy"
              className="mt-8 aspect-[3/4] w-full max-w-xs rounded-2xl object-cover object-top"
            />
          )}
        </div>
        <div data-reveal>
          <p className="text-lg">{profile.bio}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {profile.skills.map((s) => <li key={s}><Tag>{s}</Tag></li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
