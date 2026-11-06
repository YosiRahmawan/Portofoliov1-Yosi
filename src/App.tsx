import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/sections/Footer'
import { Hero } from './components/sections/Hero'
import { Journey } from './components/sections/Journey'
import { Marquee } from './components/sections/Marquee'
import { Navbar } from './components/sections/Navbar'
import { Projects } from './components/sections/Projects'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
