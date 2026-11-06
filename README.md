# Portofolio Yosi — V1

Website portofolio pribadi satu halaman: project, perjalanan (pendidikan dan pengalaman), kontak, dan download CV. Tema hitam-putih dengan aksen biru muda.

## Tech stack
Vite · React · TypeScript · Tailwind CSS · GSAP · React Bits

## Dokumen
- [PRD.md](PRD.md) — tujuan dan ruang lingkup
- [DESIGN.md](DESIGN.md) — warna, font, komponen, gerak
- [ARCHITECTURE.md](ARCHITECTURE.md) — struktur dan alur
- [CLAUDE.md](CLAUDE.md) — aturan kerja dan skill

## Menjalankan (setelah proyek dibuat)
```bash
npm install
npm run dev      # development
npm run build    # produksi (hasil di dist/)
npm run preview  # cek hasil build
```

## Mengubah konten
Edit file di `src/data/` (`profile.ts`, `projects.ts`, `journey.ts`, `socials.ts`). Ganti CV di `public/cv/Yosi-CV.pdf`.

## Status
Kerangka halaman selesai (build lolos). Data pribadi di `src/data/` masih placeholder.
