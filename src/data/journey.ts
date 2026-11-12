export type JourneyItem = {
  period: string
  title: string
  place: string
  description: string
  // poin tugas untuk CV; kosong = CV memakai description
  bullets?: string[]
  type: 'education' | 'experience'
}

// Urutan: terlama ke terbaru. Periode dihitung dari 2026 (SMK 3 tahun, S1 4 tahun, magang 3 bulan).
export const journey: JourneyItem[] = [
  {
    period: '2021 - 2024',
    title: 'Computer Network Engineering',
    place: 'SMKN 1 Rajadesa',
    description: 'Mempelajari dasar jaringan komputer dan infrastruktur TI.',
    type: 'education',
  },
  {
    period: '2023',
    title: 'Internship (PKL): Computer Technician',
    place: 'Artec Komputer, Ciamis',
    description: 'Praktik kerja lapangan sebagai teknisi di Artec Komputer, Ciamis.',
    type: 'experience',
  },
  {
    period: '2024 - Present',
    title: 'Bachelor of Information Systems (semester 5)',
    place: 'Universitas Bina Sarana Informatika (UBSI) Tasikmalaya',
    description: 'Mendalami pengembangan sistem informasi, perancangan antarmuka, dan pemrograman.',
    type: 'education',
  },
  {
    period: 'August 2026 - Present',
    title: 'Internship: UI/UX, Frontend, Backend & Mobile',
    place: 'Diskominfo Kota Tasikmalaya',
    description: 'Merancang UI/UX, membangun frontend, mengembangkan aplikasi mobile, dan mengerjakan sedikit bagian backend.',
    bullets: ['Merancang UI/UX dan membangun frontend', 'Mengembangkan aplikasi mobile', 'Mengerjakan sebagian kecil pekerjaan backend'],
    type: 'experience',
  },
  {
    period: 'November 2026 (1 month)',
    title: 'Internship: UI/UX & Frontend',
    place: 'Yayasan Abu Bakar Ash Shiddiq Tasikmalaya',
    description: 'Merancang UI/UX dan membangun antarmuka web (frontend) untuk SIAPA, sistem pembayaran SPP, daftar ulang, dan jemputan siswa SDIT Abu Bakar Ash Shiddiq.',
    bullets: ['Merancang UI/UX sistem SIAPA', 'Membangun antarmuka web (frontend) SIAPA'],
    type: 'experience',
  },
]
