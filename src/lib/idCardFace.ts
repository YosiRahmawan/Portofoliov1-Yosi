import { profile } from '../data/profile'

// Rasio muka kartu = CARD_SIZES.portrait di Lanyard.tsx (1.45 x 2.35); ubah keduanya bersama
const W = 1024
const H = Math.round((W * 2.35) / 1.45)
const NAVY = '#0b2a6f'
const BLUE = '#1d4ed8'

function roundRect(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  c.beginPath()
  c.roundRect(x, y, w, h, r)
}

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((ok, fail) => {
    const img = new Image()
    img.onload = () => ok(img)
    img.onerror = fail
    img.src = src
  })

// Menggambar muka kartu ID (foto, nama, peran, pita biru vertikal) sebagai data URL untuk tekstur kartu 3D
export async function makeIdCardFace(): Promise<string> {
  const [photo] = await Promise.all([loadImage(profile.photo), document.fonts.load('700 48px Geist'), document.fonts.load('500 32px Geist')])
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const c = canvas.getContext('2d')!
  const font = (w: number, s: number) => `${w} ${s}px Geist, system-ui, sans-serif`

  // bingkai plastik bening di luar, kartu putih di dalam
  c.fillStyle = '#e9edf3'
  c.fillRect(0, 0, W, H)
  roundRect(c, 34, 34, W - 68, H - 68, 46)
  c.fillStyle = '#ffffff'
  c.fill()
  c.lineWidth = 3
  c.strokeStyle = '#cfd6e2'
  c.stroke()

  // foto berbingkai
  const fx = 96, fy = 250, fw = 540, fh = 680
  const k = Math.max(fw / photo.width, fh / photo.height)
  c.save()
  c.beginPath()
  c.rect(fx, fy, fw, fh)
  c.clip()
  c.drawImage(photo, fx + (fw - photo.width * k) / 2, fy, photo.width * k, photo.height * k)
  c.restore()
  c.lineWidth = 7
  c.strokeStyle = NAVY
  c.strokeRect(fx, fy, fw, fh)

  // pita biru vertikal
  const bx = 716, by = 190, bw = 210, bh = 1120
  const g = c.createLinearGradient(bx, by, bx, by + bh)
  g.addColorStop(0, BLUE)
  g.addColorStop(1, '#0a2478')
  roundRect(c, bx, by, bw, bh, 16)
  c.fillStyle = g
  c.fill()
  c.save()
  c.translate(bx + bw / 2, by + bh / 2)
  c.rotate(Math.PI / 2)
  c.fillStyle = '#ffffff'
  c.font = font(700, 64)
  c.letterSpacing = '4px'
  c.textAlign = 'center'
  c.textBaseline = 'middle'
  c.fillText(profile.idCard.band, 0, 0)
  c.restore()

  // nama, peran, keterangan
  c.textAlign = 'left'
  c.textBaseline = 'alphabetic'
  c.letterSpacing = '0px'
  c.fillStyle = NAVY
  c.font = font(700, 54)
  c.fillText(profile.name.toUpperCase(), fx, 1010)
  c.fillStyle = '#9aa5b8'
  c.fillRect(fx, 1034, fw, 3)
  c.fillStyle = '#1f2937'
  c.font = font(600, 42)
  c.fillText(profile.idCard.title, fx, 1100)
  c.fillRect(fx, 1124, fw, 2)
  c.fillStyle = '#6b7280'
  c.font = font(500, 34)
  c.fillText(profile.idCard.line, fx, 1180)

  // aksen diagonal biru di kanan bawah + ikon kode
  c.beginPath()
  c.moveTo(W - 34 - 200, 1340)
  c.lineTo(W - 34, 1340)
  c.lineTo(W - 34, H - 34)
  c.lineTo(W - 34 - 380, H - 34)
  c.closePath()
  c.fillStyle = BLUE
  c.fill()
  c.beginPath()
  c.arc(W - 130, H - 130, 50, 0, Math.PI * 2)
  c.lineWidth = 5
  c.strokeStyle = '#ffffff'
  c.stroke()
  c.fillStyle = '#ffffff'
  c.font = font(700, 40)
  c.textAlign = 'center'
  c.textBaseline = 'middle'
  c.fillText('</>', W - 130, H - 128)

  // tag besar di kiri bawah
  c.textAlign = 'left'
  c.textBaseline = 'alphabetic'
  c.fillStyle = NAVY
  c.font = font(800, 46)
  c.fillText(profile.idCard.tag, fx, H - 130)

  return canvas.toDataURL('image/webp', 0.92)
}
