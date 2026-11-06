import type { Certificate } from '../../data/certificates'

// Semua sertifikat sekaligus; kartu muncul bergantian (cert-in, jeda per kartu lewat animation-delay)
export function CertificateGrid({ items, onOpen }: { items: Certificate[]; onOpen: (i: number) => void }) {
  return (
    <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((c, i) => (
        <li key={c.title + c.year} className="cert-in" style={{ animationDelay: `${i * 70}ms` }}>
          <button
            type="button"
            onClick={() => onOpen(i)}
            className="group block w-full overflow-hidden rounded-xl border border-white/15 bg-white/5 text-left transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-sky"
          >
            {c.image && <img src={c.image} alt="" loading="lazy" className="aspect-[1.41] w-full object-cover transition-transform duration-500 group-hover:scale-105" />}
            <span className="block p-3">
              <span className="block text-sm font-medium leading-snug">{c.title}</span>
              <span className="mt-1 block text-xs text-white/60">{c.year}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
