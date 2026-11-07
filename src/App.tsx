import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { Footer } from './components/sections/Footer'
import { Hero } from './components/sections/Hero'
import { Navbar } from './components/sections/Navbar'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { useHashScroll } from './hooks/useHashScroll'

// Hanya Hero, Navbar, dan Footer yang masuk unduhan pertama; sisanya dimuat saat mendekati layar
const Marquee = lazy(() => import('./components/sections/Marquee').then((m) => ({ default: m.Marquee })))
const About = lazy(() => import('./components/sections/About').then((m) => ({ default: m.About })))
const Projects = lazy(() => import('./components/sections/Projects').then((m) => ({ default: m.Projects })))
const Journey = lazy(() => import('./components/sections/Journey').then((m) => ({ default: m.Journey })))
const Contact = lazy(() => import('./components/sections/Contact').then((m) => ({ default: m.Contact })))

// Penahan tempat memegang id anchor dan tinggi perkiraan sampai section asli dimuat (mencegah lompatan tata letak)
function Deferred({ id, minHeight, margin, children }: { id?: string; minHeight: number; margin: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (show || !el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShow(true), { rootMargin: margin })
    io.observe(el)
    return () => io.disconnect()
  }, [show, margin])

  const hold = <div id={id} ref={ref} style={{ minHeight }} />
  return show ? (
    <ErrorBoundary>
      <Suspense fallback={hold}>{children}</Suspense>
    </ErrorBoundary>
  ) : (
    hold
  )
}

function Crash() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-lg font-semibold">Halaman gagal dimuat.</p>
      <button type="button" onClick={() => location.reload()} className="min-h-11 rounded-full bg-white px-6 text-sm font-medium text-black">
        Muat ulang
      </button>
    </div>
  )
}

export default function App() {
  useHashScroll()
  return (
    <ErrorBoundary fallback={<Crash />}>
      <a href="#main" className="sr-only z-[60] rounded-full bg-white px-4 py-2 text-sm text-black focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Lewati ke konten
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Deferred minHeight={116} margin="0px">
          <Marquee />
        </Deferred>
        <Deferred id="about" minHeight={800} margin="200px">
          <About />
        </Deferred>
        <Deferred id="projects" minHeight={700} margin="400px">
          <Projects />
        </Deferred>
        <Deferred id="journey" minHeight={640} margin="400px">
          <Journey />
        </Deferred>
        <Deferred id="contact" minHeight={700} margin="400px">
          <Contact />
        </Deferred>
      </main>
      <Footer />
    </ErrorBoundary>
  )
}
