# PRD — Portofolio Pribadi Yosi (V1)

## 1. Tujuan
Profil pribadi online yang menampilkan project, pendidikan, dan pengalaman Yosi. Tujuan sekunder: menarik pekerjaan freelance dan memudahkan orang mengunduh CV.

**Sukses berarti:** pengunjung paham siapa Yosi dan bisa melihat karyanya dalam kurang dari 1 menit, lalu bisa menghubungi lewat WhatsApp atau mengunduh CV dalam 1 klik.

## 2. Pengunjung
- Calon klien freelance (aksi utama: WhatsApp)
- Perekrut atau HR (aksi utama: download CV)
- Teman dan kolega (aksi utama: ikuti sosial media)

## 3. Ruang lingkup (V1)
Satu halaman (single page) dengan bagian berikut, berurutan:

| # | Bagian | Isi |
|---|--------|-----|
| 1 | Hero | Nama, peran singkat, 2 tombol: **Hubungi via WhatsApp** dan **Download CV** |
| 2 | About | Bio singkat, foto, skill/tech stack |
| 3 | Projects | Kartu project: gambar, judul, deskripsi, tech, tautan demo/GitHub |
| 4 | Journey | Timeline pendidikan dan pengalaman dari SMK sampai sekarang |
| 5 | Contact | WhatsApp, GitHub, LinkedIn, Instagram, TikTok |
| 6 | Footer | Hak cipta, tombol kembali ke atas |

## 4. Kebutuhan fungsional
- Navigasi sticky dengan anchor scroll ke tiap bagian.
- Tombol download CV membuat PDF otomatis dari data portofolio (`@react-pdf/renderer`, dimuat saat diklik).
- Tombol WhatsApp membuka `wa.me/<nomor>` dengan pesan awal yang sudah terisi.
- Semua tautan sosial membuka tab baru dengan `rel="noopener noreferrer"`.
- Data project dan timeline dibaca dari file data (`src/data/`), bukan ditulis langsung di komponen.
- Responsif: HP (360px) sampai desktop (1440px).

## 5. Kebutuhan non-fungsional
- Lighthouse Performance, Accessibility, dan SEO masing-masing ≥ 90.
- Hormati `prefers-reduced-motion`: animasi dimatikan atau disederhanakan.
- Kontras teks memenuhi WCAG AA.
- Bisa dipakai penuh dengan keyboard.

## 6. Non-goals (tidak dikerjakan di V1)
Blog, CMS, backend, form kontak dengan server, multi-bahasa, login, mode terang/gelap yang bisa diganti.

## 7. Anti-goals (dianggap gagal walau jalan)
- Terlihat seperti template AI yang generik.
- Animasi berlebihan sampai menutupi isi atau membuat lambat.
- Warna di luar palet hitam, putih, dan biru.
- Judul semua satu font (tanpa campuran sans + serif italic).

## 8. Keputusan
**Dari Yosi:** tema hitam-putih-biru (referensi foto ke-3); judul berfont campuran sans + serif italic (referensi foto 1 dan 2); efek glassmorphism; font modern; stack Vite + React + Tailwind; animasi dengan GSAP dan React Bits; tautan GitHub, LinkedIn, Instagram, WhatsApp, TikTok; desain dibantu skill ui-ux-pro-max; tujuan = profil pribadi, bisa untuk cari freelance, ada download CV.

**[Keputusan saya] (boleh diubah):**
- Bahasa isi website: Inggris.
- Satu halaman tanpa router.
- Bagian bergantian terang (putih) dan gelap (hitam/biru), tanpa tombol ganti tema.
- Efek glassmorphism di beberapa panel (hero, navbar, kartu project).
- Deploy ke Vercel atau Netlify.

## 9. Yang masih harus diisi Yosi
Nama lengkap, foto, bio, daftar project (judul, deskripsi, gambar, tautan), riwayat pendidikan dan pengalaman, nomor WhatsApp, URL semua sosial media, file CV (PDF).
