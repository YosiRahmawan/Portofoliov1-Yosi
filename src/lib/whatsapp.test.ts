import { describe, expect, it } from 'vitest'
import { contactMessage, waUrl } from './whatsapp'

const form = { name: 'Budi', subject: 'Proyek web', message: 'Halo!\nBisa bantu?' }

describe('contactMessage', () => {
  it('menyusun sapaan, subjek, dan pesan', () => {
    expect(contactMessage('Yosi', form)).toBe('Halo Yosi, saya Budi.\nSubjek: Proyek web\n\nHalo!\nBisa bantu?')
  })

  it('menyertakan email hanya bila diisi', () => {
    expect(contactMessage('Yosi', { ...form, email: 'b@x.id' })).toContain('saya Budi (b@x.id).')
    expect(contactMessage('Yosi', { ...form, email: '' })).not.toContain('(')
  })
})

describe('waUrl', () => {
  it('memakai nomor internasional dan meng-encode teks', () => {
    expect(waUrl('62812', 'a b')).toBe('https://wa.me/62812?text=a%20b')
  })

  it('karakter yang bisa merusak URL (&, #, ?, baris baru) ikut di-encode', () => {
    const url = waUrl('62812', 'a&b #1 ?x\ny')
    expect(url).not.toMatch(/[&# ]\w|\n/)
    expect(url).toContain('%26')
    expect(url).toContain('%23')
    expect(url).toContain('%0A')
    expect(new URL(url).searchParams.get('text')).toBe('a&b #1 ?x\ny')
  })
})
