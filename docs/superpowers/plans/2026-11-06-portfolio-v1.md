# Portofolio V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bangun portofolio satu halaman (Hero, About, Projects, Journey, Contact) bertema hitam-putih-biru dengan GSAP dan React Bits.

**Architecture:** Site statis Vite + React + TS. Konten di `src/data/`, dirender oleh `src/components/sections/*`, elemen kecil di `src/components/ui/*`. GSAP didaftarkan sekali di `src/lib/gsap.ts`. Komponen React Bits disalin ke `src/components/reactbits/`.

**Tech Stack:** Vite, React, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), `gsap`, `@gsap/react`, `lucide-react`, React Bits.

**Spec:** [PRD.md](../../../PRD.md), [DESIGN.md](../../../DESIGN.md), [ARCHITECTURE.md](../../../ARCHITECTURE.md), [CLAUDE.md](../../../CLAUDE.md)

## Global Constraints
- Warna hanya token: `--black #0A0A0A`, `--white #F7F7F8`, `--blue #2563EB`, `--sky #7DD3FC` (tidak ada hex lain di komponen).
- Font: Geist (sans), Instrument Serif (italic, 1-2 kata per judul), Geist Mono (label/tag).
- Animasi: hanya `transform` dan `opacity`; wajib `gsap.context` cleanup dan dukung `prefers-reduced-motion`; maks. 3-4 komponen React Bits; satu elemen satu library animasi.
- Konten hanya di `src/data/`. Tautan eksternal: `target="_blank" rel="noopener noreferrer"`.
- Lighthouse Performance, Accessibility, SEO ≥ 90; tampilan benar di 360px dan 1440px.
- Direktori bukan repo git: tidak ada langkah commit. Tidak ada test framework (YAGNI untuk situs statis); verifikasi lewat `npm run build`, lint, dan cek tampilan.

## Review Focus
- Nomor WA kosong/belum diisi → tombol WhatsApp tidak boleh menghasilkan tautan rusak (sembunyikan atau nonaktifkan).
- File CV belum ada → tombol Download CV tidak boleh menuju 404 diam-diam.
- Daftar project kosong → bagian Projects menampilkan pesan, bukan layar kosong.
- `prefers-reduced-motion: reduce` → konten tetap terlihat penuh (tidak tersangkut di `opacity: 0`).
- HP kecil (360px) → judul besar tidak overflow horizontal; panel kaca tetap terbaca.

---

### Task 1: Scaffold, dependency, token desain

**Files:**
- Create: proyek Vite di `D:\PortofolioV1-Yosi` (`package.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`)
- Create: `src/lib/gsap.ts`

**Interfaces:**
- Produces: `src/lib/gsap.ts` mengekspor `gsap` dan `ScrollTrigger` (plugin sudah terdaftar); token CSS di `src/index.css` (`--black`, `--white`, `--blue`, `--sky`, font family `--font-sans`, `--font-serif`, `--font-mono` lewat `@theme`).

- [ ] **Step 1:** Scaffold di folder yang ada (folder sudah berisi dokumen, jangan hapus): `npm create vite@latest . -- --template react-ts`, pilih "Ignore files and continue" bila ditanya. Pastikan `PRD.md`, `DESIGN.md`, `ARCHITECTURE.md`, `CLAUDE.md`, `README.md` (versi sendiri) tidak tertimpa.
- [ ] **Step 2:** `npm i gsap @gsap/react lucide-react` dan `npm i -D tailwindcss @tailwindcss/vite`; tambahkan plugin `tailwindcss()` ke `vite.config.ts`; `@import "tailwindcss";` di `src/index.css`.
- [ ] **Step 3:** Di `index.html` tambahkan Google Fonts: Geist, Geist Mono, Instrument Serif (italic). Definisikan token warna dan font di `@theme` pada `src/index.css` sesuai DESIGN.md.
- [ ] **Step 4:** Buat `src/lib/gsap.ts`: impor `gsap` dan `ScrollTrigger`, panggil `gsap.registerPlugin(ScrollTrigger)`, ekspor keduanya.
- [ ] **Step 5:** Hapus boilerplate Vite (`App.css`, aset contoh); `App.tsx` merender satu `<h1>` bergaya token.
- [ ] **Step 6:** Verifikasi. Run: `npm run build` → Expected: sukses tanpa error TypeScript. Run: `npm run dev`, buka halaman → Expected: latar `#0A0A0A`, judul memakai font Geist.

### Task 2: React Bits dan pilihan komponen

**Files:**
- Create: `src/components/reactbits/*` (hasil CLI)

**Interfaces:**
- Produces: 3 komponen React Bits siap impor (usulan: teks hero `SplitText` (berbasis GSAP), satu efek latar halus non-WebGL, satu efek kartu/hover). Pilihan akhir dikonfirmasi ke Yosi lewat pratinjau di reactbits.dev sebelum dipasang.

- [ ] **Step 1:** Baca dokumen instalasi terbaru di https://github.com/DavidHDev/react-bits (varian TS + Tailwind; via shadcn registry atau jsrepo) dan pakai perintah yang tercantum di sana.
- [ ] **Step 2:** Pasang tepat 3 komponen ke `src/components/reactbits/`; catat dependency tambahan yang ikut terpasang (mis. `motion`).
- [ ] **Step 3:** Render satu komponen di `App.tsx` sementara. Run: `npm run build` → Expected: sukses; komponen tampil di dev server tanpa error konsol.
- [ ] **Step 4:** Sesuaikan warna komponen ke token (tanpa hex baru). Hapus komponen yang tidak jadi dipakai.

### Task 3: Data dan komponen UI dasar

**Files:**
- Create: `src/data/profile.ts`, `projects.ts`, `journey.ts`, `socials.ts`
- Create: `src/components/ui/Button.tsx`, `Card.tsx`, `Tag.tsx`, `SocialLink.tsx`, `GlassPanel.tsx`

**Interfaces:**
- Produces:
  - `profile: { name: string; role: string; bio: string; photo: string; whatsapp: string; cvPath: string; skills: string[] }`
  - `projects: { title: string; description: string; image: string; tech: string[]; demoUrl?: string; repoUrl?: string }[]`
  - `journey: { period: string; title: string; place: string; description: string; type: "education" | "experience" }[]`
  - `socials: { label: "GitHub" | "LinkedIn" | "Instagram" | "TikTok" | "WhatsApp"; url: string; icon: LucideIcon | ReactNode }[]`
  - `Button({ variant: "primary" | "secondary"; href?: string; children })`, `GlassPanel({ className?; children })` (CSS glass dari DESIGN.md, blur lebih kecil di layar kecil), `Tag({ children })`, `Card`, `SocialLink({ label, url, icon })`.

- [ ] **Step 1:** Isi data dengan **placeholder jelas** (mis. "Nama Lengkap", URL `#`); `whatsapp` dan `cvPath` boleh string kosong sampai Yosi mengisi.
- [ ] **Step 2:** Implementasikan komponen UI sesuai tabel komponen di DESIGN.md (tinggi tombol ≥ 44px, fokus `--sky` 2px). `Button` dengan `href` kosong dirender nonaktif (`aria-disabled`), bukan tautan rusak.
- [ ] **Step 3:** Verifikasi. Run: `npm run build` → Expected: sukses. Render semua komponen di `App.tsx` sementara dan cek di 360px dan 1440px.

### Task 4: Sections statis dan navigasi

**Files:**
- Create: `src/components/sections/Hero.tsx`, `About.tsx`, `Projects.tsx`, `Journey.tsx`, `Contact.tsx`, `Footer.tsx`, `Navbar.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: data dan komponen UI dari Task 3; komponen React Bits dari Task 2 (hanya di Hero).
- Produces: setiap section berupa `<section id="hero|about|projects|journey|contact">`; `Navbar` berisi anchor ke id tersebut (sticky, panel kaca).

- [ ] **Step 1:** Hero: satu `<h1>` dengan judul campuran (sans tebal + 1-2 kata serif italic), dua tombol (WhatsApp, Download CV), latar biru/hitam dengan foto dan satu-dua `GlassPanel` melayang.
- [ ] **Step 2:** About, Projects (grid 1/2 kolom, pesan "Segera hadir" bila `projects` kosong), Journey (timeline vertikal, titik `--sky`), Contact (daftar `socials`), Footer (tombol ke atas). Bagian bergantian terang dan gelap.
- [ ] **Step 3:** Navbar sticky dengan anchor scroll halus; urutan heading logis (satu `h1`).
- [ ] **Step 4:** Verifikasi. Run: `npm run build` → Expected: sukses. Cek manual: tidak ada scroll horizontal di 360px; WA dan CV nonaktif bila data kosong.

### Task 5: Animasi GSAP

**Files:**
- Create: `src/hooks/useReducedMotion.ts`
- Modify: `Hero.tsx`, `About.tsx`, `Projects.tsx`, `Journey.tsx`, `Contact.tsx`

**Interfaces:**
- Consumes: `gsap`, `ScrollTrigger` dari `src/lib/gsap.ts`.
- Produces: `useReducedMotion(): boolean`.

- [ ] **Step 1:** Implement `useReducedMotion` memakai `matchMedia("(prefers-reduced-motion: reduce)")` dan berlangganan perubahan.
- [ ] **Step 2:** Tambahkan reveal saat scroll per section dengan `useGSAP`/`gsap.context` (durasi 0.3-0.8 dtk, `power2.out`, hanya `transform` + `opacity`); animasi garis dan titik timeline Journey.
- [ ] **Step 3:** Bungkus dengan `gsap.matchMedia()`: pada reduced motion, tidak ada animasi dan konten langsung terlihat penuh.
- [ ] **Step 4:** Verifikasi. Run: `npm run build` → Expected: sukses. Cek manual dengan reduced motion aktif (DevTools → Rendering) → konten terlihat penuh; scroll cepat tidak membuat elemen tersangkut.

### Task 6: SEO, aksesibilitas, performa, dan deploy

**Files:**
- Modify: `index.html`, `README.md` (status)
- Create: `public/favicon.svg`, `public/og-image.png` (placeholder bila belum ada)

- [ ] **Step 1:** `index.html`: `lang`, `<title>`, meta description, Open Graph, favicon.
- [ ] **Step 2:** Gambar: WebP, `alt` terisi, `loading="lazy"` di bawah fold.
- [ ] **Step 3:** Verifikasi. Run Lighthouse (mobile) → Expected: Performance, Accessibility, SEO masing-masing ≥ 90; navigasi keyboard penuh dengan fokus terlihat.
- [ ] **Step 4:** Update status di `README.md`; hubungkan repo ke Vercel/Netlify (`npm run build`, output `dist/`) setelah Yosi mengisi data asli.

---

## Self-review
- Cakupan PRD: 6 bagian halaman (Task 4), CV/WA (Task 3-4), responsif dan aksesibilitas (Task 4-6), non-goals tidak dikerjakan.
- Tipe konsisten: `profile`, `projects`, `journey`, `socials` didefinisikan di Task 3 dan dikonsumsi di Task 4.
- Review Focus: WA/CV kosong (Task 3-4), project kosong (Task 4), reduced motion (Task 5), 360px (Task 4).
