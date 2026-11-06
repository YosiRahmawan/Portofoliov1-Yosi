import { createElement } from 'react'
import { profile } from '../../data/profile'

// Library PDF dimuat saat dipanggil saja, bukan di bundle awal
export async function buildCvBlob(): Promise<Blob> {
  const [{ pdf }, { CvDocument }] = await Promise.all([
    import('@react-pdf/renderer'),
    import('./CvDocument'),
  ])
  const photoSrc = profile.photo ? new URL(profile.photo, window.location.origin).href : undefined
  // pdf() mengetik argumennya sebagai <Document>, padahal CvDocument membungkusnya
  return pdf(createElement(CvDocument, { photoSrc }) as never).toBlob()
}

export async function downloadCv() {
  const url = URL.createObjectURL(await buildCvBlob())
  const a = document.createElement('a')
  a.href = url
  a.download = `CV-${profile.name.replace(/\s+/g, '-')}.pdf`
  a.click()
  URL.revokeObjectURL(url)
}
