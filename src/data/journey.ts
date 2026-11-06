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
    description: 'Merancang UI/UX, membangun frontend dan backend, serta mengembangkan aplikasi mobile.',
    type: 'experience',
  },
  {
    period: 'November 2026 (1 month)',
    title: 'Internship',
    place: 'Yayasan Abu Bakar As-Shiddiq Tasikmalaya',
    description: 'Magang selama 1 bulan.',
    type: 'experience',
  },
]
