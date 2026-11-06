const skillGroups: Record<string, string[]> = {
  Design: ['Figma'],
  Frontend: ['React', 'Vite', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
  Backend: ['Laravel', 'PHP', 'MySQL', 'Supabase', 'Firebase', 'REST API', 'Midtrans', 'Python'],
  Mobile: ['Flutter', 'Dart', 'Provider'],
  Tools: ['Git', 'GitHub', 'Vercel', 'Laragon', 'Vibe Coding'],
}

export const profile = {
  name: 'Yosi Rahmawan',
  role: 'Full-Stack Developer',
  bio: 'Mahasiswa Sistem Informasi semester 5 di UBSI Tasikmalaya. Saat ini magang di Diskominfo Kota Tasikmalaya, mengerjakan UI/UX, frontend, backend, dan aplikasi mobile.',
  photo: '/images/profile.jpg',
  // nomor format internasional tanpa +; kosong = tombol nonaktif
  whatsapp: '62882002838322',
  // opsional; kosong = tidak ditampilkan di CV
  email: '',
  location: '',
  skillGroups,
  skills: Object.values(skillGroups).flat(),
  // angka di busur statistik hero
  stats: [
    { value: String(Object.values(skillGroups).flat().length), suffix: '+', label: 'SKILLS' },
    { value: '2', suffix: '', label: 'MAGANG' },
    { value: '5', suffix: '', label: 'SEMESTER' },
  ],
}
