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
  bio: 'Information Systems student (semester 5) at UBSI Tasikmalaya. Currently interning at Diskominfo Tasikmalaya City, working on UI/UX, frontend, backend, and mobile apps.',
  photo: '/images/profile.jpg',
  // draf: sesuaikan dengan caramu bekerja
  approach:
    'I design interfaces in Figma, then build them myself: frontend with React, backend with Laravel and Supabase, and mobile apps with Flutter.',
  // baris di Personal Details; baris dengan value kosong tidak ditampilkan
  details: [
    { label: 'Name', value: 'Yosi Rahmawan' },
    { label: 'Place of birth', value: 'Ciamis, Indonesia' },
    { label: 'University', value: 'UBSI Tasikmalaya, Bachelor of Information Systems' },
    { label: 'Internship', value: 'Diskominfo Tasikmalaya City' },
    { label: 'Email', value: 'yosirahmawannn@gmail.com' },
    { label: 'WhatsApp', value: '+62 882002838322' },
    { label: 'Location', value: '' },
  ],
  // nomor format internasional tanpa +; kosong = tombol nonaktif
  whatsapp: '62882002838322',
  // opsional; kosong = tidak ditampilkan di CV
  email: 'yosirahmawannn@gmail.com',
  location: '',
  skillGroups,
  skills: Object.values(skillGroups).flat(),
  // angka di busur statistik hero
  stats: [
    { value: String(Object.values(skillGroups).flat().length), suffix: '+', label: 'SKILLS' },
    { value: '2', suffix: '', label: 'INTERNSHIPS' },
    { value: '5', suffix: '', label: 'SEMESTER' },
  ],
}
