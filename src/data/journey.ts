export type JourneyItem = {
  period: string
  title: string
  place: string
  description: string
  type: 'education' | 'experience'
}

// Urutan: terlama ke terbaru. Tahun masih placeholder (20XX) sampai diisi.
export const journey: JourneyItem[] = [
  {
    period: '20XX - 20XX',
    title: 'Teknik Jaringan Komputer',
    place: 'SMKN 1 Rajadesa',
    description: 'Mempelajari dasar jaringan komputer dan infrastruktur TI.',
    type: 'education',
  },
  {
    period: '20XX - sekarang',
    title: 'S1 Sistem Informasi (semester 5)',
    place: 'Universitas Bina Sarana Informatika (UBSI) Tasikmalaya',
    description: 'Mendalami pengembangan sistem informasi, perancangan antarmuka, dan pemrograman.',
    type: 'education',
  },
  {
    period: '20XX - sekarang',
    title: 'Magang: UI/UX & Frontend Developer',
    place: 'Diskominfo Kota Tasikmalaya',
    description: 'Merancang UI/UX dan membangun frontend, serta ikut mengerjakan sisi backend.',
    type: 'experience',
  },
]
