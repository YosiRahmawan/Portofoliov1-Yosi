# ARCHITECTURE.md

## Stack
| Lapisan | Pilihan |
|---------|---------|
| Build | Vite |
| UI | React + TypeScript **[Keputusan saya]** |
| Styling | Tailwind CSS |
| Animasi | GSAP (+ ScrollTrigger), React Bits (disalin ke repo lewat CLI) |
| Ikon | `lucide-react` untuk ikon umum; sosial media berupa tautan teks (lucide v1 tanpa ikon brand) |
| Hosting | Vercel atau Netlify (statis) |

Tidak ada backend, database, atau router. Site statis satu halaman.

## Struktur folder
```
PortofolioV1-Yosi/
├─ public/
│  ├─ cv/Yosi-CV.pdf
│  ├─ images/            # foto & screenshot project
│  └─ favicon.svg
├─ src/
│  ├─ components/
│  │  ├─ sections/       # Hero, About, Projects, Journey, Contact
│  │  ├─ ui/             # Button, Card, Tag, SocialLink
│  │  └─ reactbits/      # komponen hasil CLI React Bits (jangan diedit sembarangan)
│  ├─ data/              # profile.ts, projects.ts, journey.ts, socials.ts
│  ├─ hooks/             # useReducedMotion, dll
│  ├─ lib/               # gsap.ts (registrasi plugin), utils
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css          # token warna, font, Tailwind
├─ PRD.md  DESIGN.md  ARCHITECTURE.md  README.md  CLAUDE.md
└─ index.html            # meta SEO, Open Graph
```

## Alur data
`src/data/*.ts` (konten) → `sections/*` (render) → `ui/*` (elemen kecil). Mengubah konten cukup mengedit file di `data/`, tanpa menyentuh komponen.

## Animasi
- GSAP didaftarkan sekali di `src/lib/gsap.ts` (`gsap.registerPlugin(ScrollTrigger)`), lalu diimpor dari sana.
- Tiap section memakai `useGSAP` / `gsap.context()` dengan cleanup.
- Komponen React Bits disalin ke `components/reactbits/` dan dibungkus komponen sendiri bila perlu disesuaikan dengan token warna.
- Dependency tambahan (mis. `motion`, `three`) hanya masuk kalau komponen React Bits yang dipilih memintanya.

## Performa
Gambar WebP dengan ukuran sesuai tampilan, `loading="lazy"` di bawah fold, font dengan `font-display: swap`, kode dipecah otomatis oleh Vite. Hindari komponen React Bits berbasis WebGL kecuali benar-benar perlu.

## SEO dan berbagi
`<title>`, meta description, Open Graph image, `lang`, dan favicon di `index.html`.

## Deploy
`npm run build` menghasilkan `dist/`; hubungkan repo GitHub ke Vercel/Netlify untuk deploy otomatis.
