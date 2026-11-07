import { profile } from '../data/profile'

// Satu ubin tali: lebar 192px (melintang tali) x 1280px (sepanjang tali), diulang oleh Lanyard.
// Teks dibaca sepanjang tali, seperti lanyard cetak sungguhan.
const ACROSS = 192
const ALONG = 1280

export async function makeStrapTexture(): Promise<string> {
  await document.fonts.load('700 80px "Geist Variable"')
  const canvas = document.createElement('canvas')
  canvas.width = ALONG
  canvas.height = ACROSS
  const c = canvas.getContext('2d')!

  c.fillStyle = '#0e0e10'
  c.fillRect(0, 0, ALONG, ACROSS)

  // serat anyaman halus
  c.fillStyle = 'rgba(255,255,255,0.035)'
  for (let x = 0; x < ALONG; x += 4) c.fillRect(x, 0, 1, ACROSS)

  // jahitan putus-putus di kedua tepi
  c.fillStyle = 'rgba(255,255,255,0.28)'
  for (let x = 6; x < ALONG; x += 22) {
    c.fillRect(x, 16, 12, 3)
    c.fillRect(x, ACROSS - 19, 12, 3)
  }

  // teks cetak: NAMA  ·  PERAN  ·  (diulang pas satu ubin)
  const parts: [string, string][] = [
    [profile.name.toUpperCase(), '#ffffff'],
    ['◆', '#7dd3fc'],
    [profile.role.toUpperCase(), '#9fb4d9'],
    ['◆', '#7dd3fc'],
  ]
  const GAP = 0.55 // jarak antar bagian, dalam satuan tinggi font
  let size = 70
  const widthAt = (s: number) => {
    c.font = `700 ${s}px "Geist Variable", system-ui, sans-serif`
    return parts.reduce((w, [t]) => w + c.measureText(t).width, 0) + parts.length * GAP * s
  }
  size = (size * ALONG) / widthAt(size) // pas satu ubin
  c.font = `700 ${size}px "Geist Variable", system-ui, sans-serif`
  c.textBaseline = 'middle'
  let x = (GAP * size) / 2
  for (const [t, color] of parts) {
    c.fillStyle = color
    c.fillText(t, x, ACROSS / 2 + 3)
    x += c.measureText(t).width + GAP * size
  }
  return canvas.toDataURL('image/png')
}
