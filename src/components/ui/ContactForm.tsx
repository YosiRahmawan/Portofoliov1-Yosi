import type { FormEvent } from 'react'
import { profile } from '../../data/profile'

const field =
  'w-full border-0 border-b border-white/50 bg-transparent py-2 text-white placeholder:text-white/60 focus:border-white focus:outline-none'

// Tidak ada backend: pesan dikirim lewat WhatsApp dengan isi yang sudah tersusun
export function ContactForm() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const text = [
      `Halo ${profile.name}, saya ${d.get('name')}${d.get('email') ? ` (${d.get('email')})` : ''}.`,
      `Subjek: ${d.get('subject')}`,
      '',
      d.get('message'),
    ].join('\n')
    window.open(`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }

  const off = !profile.whatsapp

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <label className="sr-only" htmlFor="c-name">Nama</label>
      <input id="c-name" name="name" required placeholder="Nama kamu" autoComplete="name" className={field} />
      <label className="sr-only" htmlFor="c-email">Email (opsional)</label>
      <input id="c-email" name="email" type="email" placeholder="Email (opsional)" autoComplete="email" className={field} />
      <label className="sr-only" htmlFor="c-subject">Subjek</label>
      <input id="c-subject" name="subject" required placeholder="Subjek" className={field} />
      <label className="sr-only" htmlFor="c-message">Pesan</label>
      <textarea id="c-message" name="message" required rows={4} placeholder="Pesan kamu" className={field} />
      <div>
        <button
          type="submit"
          disabled={off}
          className="inline-flex min-h-11 items-center rounded-full bg-black px-6 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
        >
          Kirim via WhatsApp
        </button>
        <p className="mt-3 text-xs text-white/70">Pesan akan dibuka di WhatsApp untuk dikirim.</p>
      </div>
    </form>
  )
}
