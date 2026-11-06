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
    description: 'Studied the fundamentals of computer networking and IT infrastructure.',
    type: 'education',
  },
  {
    period: '2024 - Present',
    title: 'Bachelor of Information Systems (semester 5)',
    place: 'Universitas Bina Sarana Informatika (UBSI) Tasikmalaya',
    description: 'Studying information systems development, interface design, and programming.',
    type: 'education',
  },
  {
    period: 'August 2026 - Present',
    title: 'Internship: UI/UX, Frontend, Backend & Mobile',
    place: 'Diskominfo Tasikmalaya City',
    description: 'Designing UI/UX, building frontend and backend, and developing mobile apps.',
    type: 'experience',
  },
  {
    period: 'November 2026 (1 month)',
    title: 'Internship',
    place: 'Yayasan Abu Bakar As-Shiddiq Tasikmalaya',
    description: 'One-month internship.',
    type: 'experience',
  },
]
