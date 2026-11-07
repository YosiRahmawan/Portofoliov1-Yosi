# CLAUDE.md — Aturan Proyek

Baca `PRD.md`, `DESIGN.md`, dan `ARCHITECTURE.md` sebelum mengubah apa pun. Ketiganya adalah sumber kebenaran.

## Skill yang dipakai
- **ui-ux-pro-max** — setiap pekerjaan desain/UI, dipakai bersama `DESIGN.md`.
- **antislop** (+ `antislop-ui`) — agar hasil tidak terlihat seperti template AI.
- **ponytail** — perubahan sekecil mungkin yang tuntas.
- **superpowers:verification-before-completion** — jangan klaim selesai sebelum dicek (build dan tampilan).

## Aturan kode
- React + TypeScript + Tailwind. Komponen fungsi, satu komponen per file.
- Konten hanya di `src/data/`, bukan di komponen.
- Warna dan font hanya lewat token di `DESIGN.md`; tidak ada hex acak di komponen.
- Ikuti struktur di `ARCHITECTURE.md`; jangan buat folder baru tanpa alasan.
- Komentar hanya untuk "kenapa", bukan "apa".

## Aturan animasi
- GSAP untuk scroll/timeline; React Bits untuk efek siap pakai (sekarang 6: SplitText, SpotlightCard, SpecularButton, ScrollVelocity, RubberSegment, Lanyard; tambah baru hanya bila perlu).
- Satu elemen = satu library animasi.
- Wajib: cleanup (`gsap.context`) dan dukung `prefers-reduced-motion`.
- Hanya animasikan `transform` dan `opacity`.

## Aturan umum
- Jangan tambah dependency tanpa alasan jelas; sebutkan alasannya.
- Jangan menaruh nomor telepon, token, atau data pribadi di kode selain di `src/data/`.
- Cek sebelum selesai: `npm run build` lolos, tampilan benar di 360px dan 1440px, fokus keyboard terlihat.
- Jangan commit atau push tanpa diminta.
