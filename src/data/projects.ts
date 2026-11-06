export type Project = {
  title: string
  description: string
  image: string
  // gambar tambahan untuk jendela detail; details = paragraf artikel di jendela detail
  gallery?: string[]
  details?: string[]
  tech: string[]
  demoUrl?: string
  repoUrl?: string
}

const shot = (slug: string) => `/images/projects/${slug}.webp`
const gh = (repo: string) => `https://github.com/YosiRahmawan/${repo}`

// Deskripsi diringkas dari README tiap repo. image kosong = kartu tanpa gambar.
export const projects: Project[] = [
  {
    title: 'SATU RUMAH',
    description:
      'Aplikasi mobile untuk perizinan penyerahan PSU (prasarana, sarana, dan utilitas) perumahan Kota Tasikmalaya. Menghubungkan pengembang, admin Disperwaskim, dan tim pengawas lapangan. Saat ini masih prototipe dengan data dummy.',
    image: '',
    tech: ['Flutter', 'Dart', 'Riverpod', 'Laravel'],
    repoUrl: gh('Satu-rumahv2'),
  },
  {
    title: 'SIAPA',
    description:
      'Aplikasi web pengelolaan pembayaran SPP, daftar ulang, dan jemputan siswa SDIT Abu Bakar Ash Shiddiq Rajapolah, dengan pembayaran QRIS dan peringatan tunggakan. Backend sudah selesai dan teruji, antarmuka berjalan untuk peran admin, keuangan, dan yayasan.',
    image: shot('siapa-keuangan'),
    gallery: [shot('siapa-keuangan'), shot('siapa-login'), shot('siapa-pengguna'), shot('siapa-laporan')],
    details: [
      'Mengelola pembayaran SPP, daftar ulang, dan jemputan siswa SDIT Abu Bakar Ash Shiddiq Rajapolah, baik manual maupun QRIS, lengkap dengan peringatan tunggakan. NIS menjadi primary key siswa.',
      'Ada empat peran: Admin, Kepala Sekolah atau Yayasan, Petugas Keuangan, dan Siswa (orang tua). Pembayaran dan jemputan diinput oleh Petugas Keuangan, pembayaran QRIS dikonfirmasi petugas, dan laporan dapat diekspor sebagai CSV yang dibuka di Excel.',
      'Backend sudah selesai dan teruji (52 tes): login dan role, pengguna dan siswa, tagihan, pembayaran manual dan QRIS, pembatalan, peringatan jatuh tempo, laporan, dan audit log. Database memakai Supabase (PostgreSQL).',
    ],
    tech: ['Laravel', 'PHP', 'Supabase'],
    repoUrl: gh('Project-SIAPA'),
  },
  {
    title: '204 Project Group',
    description:
      'Kantor virtual berbasis AI: peta isometrik interaktif, task board kanban, approval inbox, dan dashboard untuk satu CEO dan tim agen. Eksekusi AI belum tersambung, langkah task masih simulasi.',
    image: shot('204-office'),
    gallery: [shot('204-office'), shot('204-team'), shot('204-overview')],
    details: [
      'Kantor virtual untuk satu CEO manusia dan tim agen AI yang direncanakan. Sudah ada peta isometrik interaktif dengan tujuh karakter, task board kanban, approval inbox, riwayat dan log, dashboard ringkasan, lampiran file, serta login untuk pemilik.',
      'Task, riwayat, dan lampiran tersimpan di server (SQLite). Halaman Tim & agent menyimpan konfigurasi tiap agent: peran, atasan, model, izin, dan batas sumber daya. Konfigurasi ini belum menjalankan AI, jadi langkah task masih simulasi.',
      'Ada juga AI Affiliate Studio untuk menyusun campaign afiliasi (script, caption, hashtag, storyboard) yang harus disetujui pemilik sebelum dipakai.',
    ],
    tech: ['TypeScript', 'React', 'Fastify', 'SQLite'],
    repoUrl: gh('204-Project-Group'),
  },
  {
    title: 'PKG Web Fresh',
    description:
      'Tugas project kampus: sistem absensi berbasis web sesuai permintaan customer, dibuat dengan Laravel dan dilengkapi aplikasi Flutter pendamping.',
    image: '',
    tech: ['Laravel', 'PHP', 'Tailwind CSS', 'Flutter'],
    repoUrl: gh('pkg-web-fresh'),
  },
]
