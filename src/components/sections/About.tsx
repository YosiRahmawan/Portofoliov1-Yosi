import { useRef } from 'react'
import { profile } from '../../data/profile'
import { useReveal } from '../../hooks/useReveal'
import { Em, SectionTitle } from '../ui/Heading'

function Block({ title, children }: { title: string; children: string }) {
  return (
    <div data-reveal>
      <h3 className="border-b border-black/15 pb-2 text-sm font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-black/70">{children}</p>
    </div>
  )
}

export function About() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  const details = profile.details.filter((d) => d.value)
  return (
    <section ref={ref} id="about" aria-labelledby="about-title" className="bg-white px-4 py-16 text-black sm:px-8 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div data-reveal className="text-center">
          <SectionTitle id="about-title">About <Em>me</Em></SectionTitle>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:gap-14">
          <div data-reveal className="overflow-hidden rounded-2xl bg-linear-to-b from-ink to-blue shadow-xl">
            <img
              src="/images/hero-reveal.webp"
              alt={`Photo of ${profile.name}`}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover object-top"
            />
          </div>
          <div className="flex flex-col gap-10">
            <div className="grid gap-8 sm:grid-cols-2">
              <Block title="Who am I">{profile.bio}</Block>
              <Block title="My approach">{profile.approach}</Block>
            </div>
            <div data-reveal>
              <h3 className="border-l-2 border-black pl-3 text-sm font-semibold">Personal details</h3>
              <dl className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                {details.map((d) => (
                  <div key={d.label}>
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-black/50">{d.label}</dt>
                    <dd className="mt-1 text-sm font-semibold">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
