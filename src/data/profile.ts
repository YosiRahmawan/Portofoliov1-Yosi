const skillGroups: Record<string, string[]> = {
  Design: ['Figma', 'Canva'],
  Frontend: ['React', 'Next.js', 'Vite', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
  Backend: ['Laravel', 'PHP', 'MySQL', 'Supabase', 'Firebase', 'REST API', 'Python'],
  Mobile: ['Flutter', 'Dart', 'Provider'],
  Tools: ['Git', 'GitHub', 'Vercel', 'Laragon'],
}

export const profile = {
  name: 'Yosi Rahmawan',
  role: 'Full-Stack Developer',
  bio: 'Mahasiswa Sistem Informasi semester 5 di UBSI Tasikmalaya. Saat ini magang di Diskominfo Kota Tasikmalaya, mengerjakan UI/UX, frontend, backend, dan aplikasi mobile.',
  photo: '/images/profile.jpg',
  // draf: sesuaikan dengan caramu bekerja
  approach:
    'Saya merancang antarmuka di Figma lalu membangunnya sendiri: frontend dengan React dan Next.js, backend dengan Laravel dan Supabase, serta aplikasi mobile dengan Flutter.',
  // baris di Personal Details; baris dengan value kosong tidak ditampilkan
  details: [
    { label: 'Name', value: 'Yosi Rahmawan' },
    { label: 'Place of birth', value: 'Ciamis, Indonesia' },
    { label: 'University', value: 'UBSI Tasikmalaya, S1 Sistem Informasi' },
    { label: 'Internship', value: 'Diskominfo Kota Tasikmalaya' },
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
