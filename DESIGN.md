# DESIGN.md — Sistem Desain

Arah: **editorial, tegas, modern**. Hitam, putih, dan biru. Karakter datang dari judul besar berfont campuran, foto/visual yang kuat, dan panel kaca (glassmorphism).

Referensi dari Yosi: (1) judul serif italic + sans tebal, (2) judul sans tebal besar + serif italic, (3) palet biru-putih-hitam dengan panel kaca.

## Warna
| Token | Hex | Pakai untuk |
|-------|-----|-------------|
| `--black` | `#0A0A0A` | Latar gelap, teks di latar terang |
| `--white` | `#F7F7F8` | Latar terang, teks di latar gelap |
| `--blue` | `#2563EB` | Permukaan besar (hero/section biru), tombol utama |
| `--sky` | `#7DD3FC` | Aksen biru muda: highlight, fokus, titik timeline |
| `--muted` | `#737373` (terang) / `#A3A3A3` (gelap) | Teks sekunder |
| `--border` | `#E5E5E5` (terang) / `#262626` (gelap) | Garis pemisah |

**[Keputusan saya]** Hero memakai biru `--blue` atau hitam dengan foto; bagian lain bergantian putih dan hitam. Hanya biru, hitam, putih. Tidak ada gradien ungu/pink. `--sky` tidak dipakai sebagai warna teks di latar putih (kontras kurang). Teks putih di atas `--blue` lolos AA untuk teks besar.

## Tipografi
**[Keputusan saya]** Tiga font (semuanya Google Fonts):
- **Geist** (tebal, tracking rapat) untuk judul sans dan isi.
- **Instrument Serif** (*italic*) untuk kata-kata penekan di dalam judul.
- **Geist Mono** untuk label kecil dan tag teknologi.

Pola judul campuran (seperti referensi): satu judul, sebagian kata sans tebal, sebagian serif italic. Contoh: "**Building** *thoughtful* **web experiences**". Maks. 1-2 kata serif per judul, jangan seluruh kalimat.
- Judul hero: `clamp(2.75rem, 8vw, 7rem)`, sans berat 600-700, tracking `-0.03em`, line-height 0.95-1.
- Judul bagian: `clamp(1.75rem, 4vw, 3.5rem)`.
- Isi: 16-18px, line-height 1.6, lebar baris maks. ~65 karakter.
- Opsional: font sans condensed tebal (mis. Anton) untuk gaya referensi ke-2, hanya bila dipilih nanti.

## Glassmorphism
Dipakai hemat, hanya di atas foto/latar berwarna (di atas warna polos efeknya hilang): kartu melayang di hero, kartu project saat hover, navbar.
```css
background: rgb(255 255 255 / 0.12);
backdrop-filter: blur(16px) saturate(140%);
border: 1px solid rgb(255 255 255 / 0.25);
border-radius: 16px;
```
Maks. 3-4 panel kaca per layar. Pastikan teks di atasnya tetap kontras AA. `backdrop-filter` mahal di HP, jadi kurangi blur di layar kecil.

## Spasi dan tata letak
- Skala spasi kelipatan 4px; jarak antar bagian `py-24` (desktop) / `py-16` (HP).
- Kontainer maks. `1200px`, gutter 16px (HP) / 32px (desktop).
- Grid project: 1 kolom (HP), 2 kolom (≥768px).
- Radius: `12px` kartu, `9999px` tombol dan tag.

## Komponen inti
- **Button:** utama = isi `--blue` (teks putih) atau hitam; sekunder = outline. Tinggi min. 44px.
- **Card project:** panel kaca atau putih berborder, hover: naik 4px dan border `--sky`.
- **Tag teknologi:** pill, Geist Mono, 12px.
- **Timeline:** garis vertikal `--border`, titik `--sky`.
- **Link sosial:** ikon + label, fokus terlihat jelas.

## Gerak (animasi)
| Alat | Dipakai untuk |
|------|---------------|
| **GSAP + ScrollTrigger** | Reveal saat scroll, timeline, transisi antar bagian |
| **React Bits** | Efek siap pakai: teks hero (mis. split/blur text), latar halus, kartu — **maks. 3-4 komponen** |

Aturan:
- Durasi 0.3-0.8 detik, easing `power2.out` / `power3.out`.
- Hanya animasikan `transform` dan `opacity`.
- Satu elemen = satu library animasi (jangan campur GSAP dan motion di elemen yang sama).
- Bungkus dengan `gsap.matchMedia()` dan matikan saat `prefers-reduced-motion: reduce`.
- Bersihkan di `useEffect` / `gsap.context()` supaya tidak bocor.

## Aksesibilitas
Kontras AA, fokus keyboard terlihat (outline `--sky` 2px), alt text pada gambar, target sentuh ≥ 44px, urutan heading logis (satu `h1`).

## Hero (siluet dengan sorot)
- Dua lapisan berukuran sama (1087x1447, rasio 3:4, tanpa perpanjangan buatan): `public/images/hero-base.webp` = foto siluet dengan cahaya biru dari belakang, `hero-reveal.webp` = foto berwarna, subjek dipotong dari latarnya dan disejajarkan ke wajah di siluet.
- Foto berwarna hanya terlihat di dalam lingkaran sorot (mask `radial-gradient`, radius 260px, 160px di HP) yang mengikuti kursor dengan lerp 0.1. Posisi sorot lewat CSS variable `--mx/--my` (`useSpotlight`), tanpa render ulang React.
- Layar sentuh: sorot melayang sendiri; reduced motion: sorot diam di tengah.
- Busur statistik di kanan (`StatsArc`), angka dari `profile.stats`; disembunyikan di bawah 640px.
- Tepi kiri/kanan bingkai memudar ke latar hero (biru gelap, sama dengan tepi kiri foto). Jangan perpanjang bahu/latar secara buatan: pernah dicoba dan hasilnya aneh.

## Tech Stack (bola 3D + kartu)
- Tab Tech Stack di "Selected work": bola biru bercahaya di tengah (`TechOrb`, three.js murni: shader tepi menyala, tiga cincin cahaya, debu partikel), empat kartu kaca di kiri/kanan (`TechCard`) dengan garis menyala ke bola. Design digabung ke Frontend hanya di tampilan.
- `TechOrb` dimuat lazy (hanya saat tab dibuka), berhenti menggambar saat di luar layar atau tab browser tersembunyi, satu frame diam bila reduced motion. Warna dibaca dari token `--color-blue` dan `--color-sky`.
- HP: bola di atas, kartu bertumpuk, garis disembunyikan.
- Perpindahan tab memakai `RubberSegment` (React Bits, thumb karet yang bisa digeser); panel baru fade-up dan tinggi areanya dianimasikan.
- Kartu kategori memakai `SpecularButton` (React Bits, 4 konteks WebGL) sebagai bingkai luar, tanpa fokus/klik; tag di dalamnya polos (`Tag`). Jangan pakai SpecularButton per tag: 23 konteks melewati batas ~16 di browser.
- Kanvas bola dibuat lebih besar dari selnya (`-inset-14`) dan kamera dijauhkan, agar cincin, cahaya, dan debu tidak terpotong tepi kanvas.

## Kartu ID 3D (Contact)
- Muka kartu digambar di canvas (`src/lib/idCardFace.ts`) dari `profile` (foto, nama) dan `profile.idCard` (band, title, line, tag), lalu dipakai sebagai tekstur `Lanyard`. Ubah teks kartu di `src/data/profile.ts`.
- Proporsi kartu 1.45 x 2.35 (`CARD_SIZES.portrait` di Lanyard.tsx) harus sama dengan `W`/`H` di `idCardFace.ts`. Tali hitam, `strapWidth` 0.45, `size` 0.7, `strapLength` 0.3 agar kartu muat di kanvas.
- Kanvas Lanyard naik sampai tepi atas section supaya tali tergantung dari atas; cincin bertumpu di tepi atas lubang kartu (pelat logam di sekeliling lubang).
- Tali: hitam dengan cetak teks (`src/lib/strapTexture.ts`: nama dan peran dari `profile`, jahitan putus-putus di tepi, serat anyaman) dan gesper plastik arang di 62% panjang tali (`BUCKLE_AT` di Lanyard.tsx).

## Kartu project dengan gambar
- Project yang punya `image` menampilkan sampul penuh di atas kartu; bagian bawahnya memudar ke warna permukaan kartu dengan sedikit blur (`.cover-fade` dan `.cover-blur`), dan judul berada di atas bagian yang memudar itu.
- `gallery` dan `details` (paragraf artikel) di `src/data/projects.ts` muncul di jendela detail (`ProjectViewer`, tombol "Details"); tombol hanya ada bila salah satunya terisi. Tangkapan layar dipotong dari bilah tab browser dan taskbar, lalu disimpan sebagai WebP di `public/images/projects/`.
- Deskripsi di kartu project dipotong empat baris dengan "..." (`line-clamp-4`) supaya tinggi kartu seragam; teks lengkap ada di jendela Details. Klik gambar di Details membuka layar penuh (dialog terpisah, Esc hanya menutup gambar besar).
- Logo teknologi project dipetakan di `src/data/techIcons.ts` (TypeScript, SQLite, Fastify dari simple-icons; Riverpod, Canva, REST API, Provider memakai ikon umum karena tidak punya logo merek).

## Performa
- Hanya Hero, Navbar, dan Footer yang masuk unduhan pertama; Marquee, About, Projects, Journey, Contact dimuat saat mendekati layar (`Deferred` di `App.tsx`, penahan tempat membawa id anchor). Komponen 3D dan CV PDF dimuat lazy.
- Font di-host sendiri lewat `@fontsource` (Geist Variable, Geist Mono Variable, Instrument Serif italic); nama keluarga canvas kartu ID dan tali memakai "Geist Variable".
- Animasi hero hanya menggeser (tanpa opacity 0) agar paragraf hero jadi kandidat LCP sejak render pertama.
- Sampul kartu project memakai versi 800px (`*-card.webp`), foto About memakai `about.webp` (640px).
- `ErrorBoundary` membungkus app dan bagian 3D: tanpa WebGL, halaman tetap tampil tanpa bola.
- `useHashScroll` menggulir ulang ke anchor (#contact, klik navbar) beberapa kali sesudah section termuat, karena tinggi halaman berubah saat section dimuat bertahap; berhenti bila pengunjung menggulir sendiri.
- Hasil ukur Lighthouse (build produksi): desktop performance 99, mobile 78-81 (naik dari 59 dan 53); accessibility, best-practices, SEO semuanya 100. Sisa beban mobile: skrip awal (React, GSAP, SplitText) dan CSS yang menahan render.
- Timeline Journey: garis biru terisi turun mengikuti scroll (`useTimelineProgress`, scaleY dengan easing 0.14) dan titik menyala saat ujung garis melewatinya; ujung garis berada di 60% tinggi layar. Reduced motion: garis langsung mengikuti posisi tanpa easing.
