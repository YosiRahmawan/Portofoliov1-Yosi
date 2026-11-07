import type { FormEvent } from 'react'
import { profile } from '../../data/profile'
import { contactMessage, waUrl } from '../../lib/whatsapp'

const field =
  'w-full border-0 border-b border-white/50 bg-transparent py-2 text-white placeholder:text-white/60 focus:border-white focus:outline-none'

// Tidak ada backend: pesan dikirim lewat WhatsApp dengan isi yang sudah tersusun (teks tampil: Inggris)
export function ContactForm() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const val = (k: string) => String(d.get(k) ?? '')
    const text = contactMessage(profile.name, { name: val('name'), email: val('email'), subject: val('subject'), message: val('message') })
    window.open(waUrl(profile.whatsapp, text), '_blank', 'noopener,noreferrer')
  }

  const off = !profile.whatsapp

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <label className="sr-only" htmlFor="c-name">Name</label>
      <input id="c-name" name="name" required placeholder="Your name" autoComplete="name" className={field} />
      <label className="sr-only" htmlFor="c-email">Email (optional)</label>
      <input id="c-email" name="email" type="email" placeholder="Email (optional)" autoComplete="email" className={field} />
      <label className="sr-only" htmlFor="c-subject">Subject</label>
      <input id="c-subject" name="subject" required placeholder="Subject" className={field} />
      <label className="sr-only" htmlFor="c-message">Message</label>
      <textarea id="c-message" name="message" required rows={4} placeholder="Your message" className={field} />
      <div>
        <button
          type="submit"
          disabled={off}
          className="inline-flex min-h-11 items-center rounded-full bg-black px-6 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send via WhatsApp
        </button>
        <p className="mt-3 text-xs text-white/70">Pesan akan dibuka di WhatsApp untuk dikirim.</p>
      </div>
    </form>
  )
}
