# Portofolio Yosi — V1

Website portofolio pribadi satu halaman: project, perjalanan (pendidikan dan pengalaman), kontak, dan download CV. Tema hitam-putih-biru dengan efek kaca dan animasi 3D.

## Tech stack
Vite · React · TypeScript · Tailwind CSS · GSAP · React Bits · three.js · react-pdf

## Dokumen
- [PRD.md](PRD.md) — tujuan dan ruang lingkup
- [DESIGN.md](DESIGN.md) — warna, font, komponen, gerak
- [ARCHITECTURE.md](ARCHITECTURE.md) — struktur dan alur
- [CLAUDE.md](CLAUDE.md) — aturan kerja dan skill

## Menjalankan
```bash
npm install
npm run dev      # development
npm run build    # produksi (hasil di dist/)
npm run preview  # cek hasil build
npm test         # tes (vitest)
```

## Mengubah konten
Edit file di `src/data/` (`profile.ts`, `projects.ts`, `certificates.ts`, `journey.ts`, `socials.ts`, `techIcons.ts`). Gambar project di `public/images/projects/`, sertifikat di `public/images/certificates/`. CV dibuat otomatis (PDF) dari data yang sama lewat tombol Download CV; isi `email` dan `location` di `profile.ts` bila mau ditampilkan, dan `bullets` di `journey.ts` untuk poin tugas.

## Status
Situs berjalan dan sudah terisi: 4 project, 13 sertifikat, tech stack, journey, kartu ID 3D, dan CV PDF satu halaman. Belum diisi: poin tugas tiap magang (`bullets`), domisili (`location`), dan `og:url`/canonical (menunggu domain deploy).

CI (`.github/workflows/ci.yml`) menjalankan build dan tes di setiap push.
