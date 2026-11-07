export type Project = {
  title: string
  description: string
  image: string
  // versi kecil (800px) untuk kartu; kosong = pakai image
  cover?: string
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
      'Sistem digital perizinan penyerahan PSU (prasarana, sarana, dan utilitas) perumahan Kota Tasikmalaya: aplikasi mobile Flutter untuk pengembang dan tim lapangan, serta portal web untuk verifikator Disperwaskim.',
    image: shot('satu-rumah-dashboard'),
    cover: shot('satu-rumah-dashboard-card'),
    gallery: [shot('satu-rumah-dashboard'), shot('satu-rumah-mobile'), shot('satu-rumah-login')],
    details: [
      'SATU RUMAH (Sistem Aplikasi Terpadu Urusan Rumah) mendigitalkan penyerahan PSU perumahan dari pengembang kepada Pemerintah Kota Tasikmalaya melalui Dinas Perumahan dan Kawasan Permukiman (Disperwaskim).',
      'Tiga peran dalam satu alur: pengembang mengajukan berkas dan memantau status lewat notifikasi, admin Disperwaskim memverifikasi berkas dan menugaskan survey lewat portal web (dashboard pengawasan, antrean pengajuan, ekspor CSV), dan tim lapangan menjalankan survey, mendokumentasikan temuan, lalu menerbitkan Berita Acara.',
      'Aplikasi mobile dibangun dengan Flutter (Riverpod dan GoRouter), Berita Acara dapat dicetak atau dibagikan sebagai PDF, dan portal web admin memakai Laravel. Data di tangkapan layar adalah data contoh.',
    ],
    tech: ['Flutter', 'Dart', 'Riverpod', 'Laravel'],
    repoUrl: gh('Satu-rumahv2'),
  },
  {
    title: 'SIAPA',
    description:
      'Aplikasi web pengelolaan pembayaran SPP, daftar ulang, dan jemputan siswa SDIT Abu Bakar Ash Shiddiq Rajapolah, dengan pembayaran QRIS dan peringatan tunggakan. Backend sudah selesai dan teruji, antarmuka berjalan untuk peran admin, keuangan, dan yayasan.',
    image: shot('siapa-keuangan'),
    cover: shot('siapa-keuangan-card'),
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
    cover: shot('204-office-card'),
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
      'SIMPEG, sistem penilaian kinerja guru untuk MTs Jidris As-Salam: admin mengelola data user, guru, jabatan, kriteria, kompetensi, dan indikator, lalu memantau penilaian lewat dashboard. Tugas project kampus dengan Laravel dan aplikasi Flutter pendamping.',
    image: shot('pkg-dashboard'),
    cover: shot('pkg-dashboard-card'),
    gallery: [shot('pkg-dashboard'), shot('pkg-guru'), shot('pkg-login')],
    details: [
      'SIMPEG (Sistem Penilaian Kinerja Guru) dibuat untuk MTs Jidris As-Salam sebagai tugas project kampus atas permintaan customer.',
      'Panel admin mengelola data user, data guru, jabatan, kriteria, kompetensi, dan indikator penilaian. Dashboard menampilkan total guru, total penilai, total evidence, total penilaian, rata-rata skor per periode, dan status evaluasi.',
      'Web dibangun dengan Laravel (Blade dan Tailwind CSS), dan repo yang sama memuat aplikasi Flutter (flutter_simpeg_app).',
    ],
    tech: ['Laravel', 'PHP', 'Tailwind CSS', 'Flutter'],
    repoUrl: gh('pkg-web-fresh'),
  },
]
