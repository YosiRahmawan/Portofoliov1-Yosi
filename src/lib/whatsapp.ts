export type ContactForm = { name: string; email?: string; subject: string; message: string }

export const waUrl = (number: string, text: string) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`

export const contactMessage = (owner: string, f: ContactForm) =>
  [`Halo ${owner}, saya ${f.name}${f.email ? ` (${f.email})` : ''}.`, `Subjek: ${f.subject}`, '', f.message].join('\n')
