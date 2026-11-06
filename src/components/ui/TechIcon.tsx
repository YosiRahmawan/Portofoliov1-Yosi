import { techIcons } from '../../data/techIcons'

// Warna merek di latar gelap; yang terlalu gelap (Next.js, Vercel, GitHub, Flutter) dipakai putih
const readable = (hex: string) => {
  const n = parseInt(hex, 16)
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
  return lum < 0.34 ? '#f5f5f5' : `#${hex}`
}

export function TechIcon({ name, size = 14 }: { name: string; size?: number }) {
  const icon = techIcons[name]
  if (!icon) return null
  if ('fallback' in icon) {
    const Fallback = icon.fallback
    return <Fallback size={size} aria-hidden className="shrink-0" />
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden className="shrink-0" fill={readable(icon.hex)}>
      <path d={icon.path} />
    </svg>
  )
}
