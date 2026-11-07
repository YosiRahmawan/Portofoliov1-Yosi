import { useEffect } from 'react'

// Section dimuat bertahap, jadi tinggi halaman berubah sesudah anchor (#contact) diklik atau dibuka langsung.
// Gulir ke target lagi beberapa kali; berhenti begitu pengunjung menggulir sendiri.
export function useHashScroll() {
  useEffect(() => {
    let timers: number[] = []
    let moved = false
    const cancel = () => {
      moved = true
    }
    const run = () => {
      timers.forEach(clearTimeout)
      moved = false
      const id = decodeURIComponent(location.hash.slice(1))
      timers = id
        ? [0, 600, 1600].map((ms) => window.setTimeout(() => !moved && document.getElementById(id)?.scrollIntoView(), ms))
        : []
    }
    const inputs = ['wheel', 'touchstart', 'keydown']
    run()
    window.addEventListener('hashchange', run)
    inputs.forEach((e) => window.addEventListener(e, cancel, { passive: true }))
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('hashchange', run)
      inputs.forEach((e) => window.removeEventListener(e, cancel))
    }
  }, [])
}
