import { projects } from './projects'

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
  // judul hero; accent tampil dengan huruf miring serif
  headline: { line1: 'Where Ideas', line2: 'Become', accent: 'Innovation.' },
  availability: 'Terbuka untuk proyek freelance dan kolaborasi.',
  // singkat, untuk hero
  intro: 'Mahasiswa Sistem Informasi yang membangun sistem efisien, mudah dipahami, dan tampil rapi.',
  bio: 'Saya Yosi, mahasiswa Sistem Informasi semester 5 di UBSI Tasikmalaya. Saat ini saya magang di Diskominfo Kota Tasikmalaya, mengerjakan UI/UX, frontend, backend, dan aplikasi mobile. Fokus saya adalah sistem yang efisien dan mudah dipahami pengguna.',
  photo: '/images/profile.jpg',
  approach:
    'Tampilan yang baik dan sistem yang baik saling menguatkan. Saya merancang antarmuka yang menarik tanpa mengorbankan kesederhanaan sistem: alur yang jelas, performa yang cepat, dan kode yang mudah dikembangkan. Desain saya buat di Figma, lalu saya implementasikan dengan React, Next.js, Laravel, Supabase, dan Flutter.',
  // baris di Personal Details; baris dengan value kosong tidak ditampilkan. Email dan WhatsApp sengaja tidak ditampilkan di web (hanya di CV dan tombol WhatsApp)
  details: [
    { label: 'Name', value: 'Yosi Rahmawan' },
    { label: 'Location', value: 'West Java, Indonesia' },
    { label: 'University', value: 'UBSI Tasikmalaya, S1 Sistem Informasi' },
    { label: 'Internship', value: 'Diskominfo Kota Tasikmalaya' },
  ],
  // teks di kartu ID 3D (bagian Contact)
  idCard: {
    band: 'JUNIOR DEVELOPER',
    title: 'Junior Developer',
    line: 'UBSI Tasikmalaya',
    tag: 'UI/UX · Web · Mobile',
  },
  // nomor format internasional tanpa +; kosong = tombol nonaktif
  whatsapp: '62882002838322',
  // opsional; kosong = tidak ditampilkan di CV
  email: 'yosirahmawannn@gmail.com',
  location: 'West Java, Indonesia',
  skillGroups,
  // angka di busur statistik hero
  stats: [
    { value: String(Object.values(skillGroups).flat().length), suffix: '+', label: 'SKILLS' },
    { value: '2', suffix: '', label: 'INTERNSHIPS' },
    { value: String(projects.length), suffix: '', label: 'PROJECTS' },
  ],
}
