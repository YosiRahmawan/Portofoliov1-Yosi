export type Certificate = {
  title: string
  issuer: string
  year: string
  image?: string
  url?: string
}

const img = (slug: string) => `/images/certificates/${slug}.webp`

// Terbaru di atas. url = gambar sertifikat ukuran penuh.
export const certificates: Certificate[] = [
  { title: 'AI Career Readiness Training (ASEAN Ahead)', issuer: 'ASEAN Foundation × LinkedIn', year: '2026', image: img('ai-career-readiness'), url: img('ai-career-readiness') },
  { title: 'Seminar Nasional: Tasikmalaya Grow Mindset for Futurepreneur', issuer: 'Grow Insight × BEM FEB UNSIL', year: '2026', image: img('grow-mindset'), url: img('grow-mindset') },
  { title: 'Training Public Speaking', issuer: 'Grow Insight × BEM FEB UNSIL', year: '2026', image: img('public-speaking'), url: img('public-speaking') },
  { title: 'Seminar Character Building', issuer: 'Grow Insight × BEM FEB UNSIL', year: '2026', image: img('character-building'), url: img('character-building') },
  { title: 'FEST GoWorld Asia Futurepreneur Selection 2026', issuer: 'FEST Go World × Grow Insight', year: '2026', image: img('fest-goworld'), url: img('fest-goworld') },
  { title: 'Skill Improvement Webinar Bootcamp', issuer: 'Grow Insight × BEM FEB UNSIL', year: '2026', image: img('skill-bootcamp'), url: img('skill-bootcamp') },
  { title: 'Indonesia Cerdas Fest 2025', issuer: 'UBSI Kampus Tasikmalaya', year: '2025', image: img('indonesia-cerdas-fest-2025'), url: img('indonesia-cerdas-fest-2025') },
  { title: 'Talkshow Digital Kreatif & Entrepreneur', issuer: 'UBSI Kampus Tasikmalaya', year: '2024', image: img('talkshow-digital-kreatif-2024'), url: img('talkshow-digital-kreatif-2024') },
  { title: 'NGOREX Design: Kelas UI/UX Design (Figma)', issuer: 'HIMASI UBSI Kampus Tasikmalaya', year: '2024', image: img('ngorex-design-2024'), url: img('ngorex-design-2024') },
]
