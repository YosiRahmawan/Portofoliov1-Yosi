import { lazy, Suspense, useEffect, useState } from 'react'
import { profile } from '../../data/profile'
import { Button } from './Button'

// Efek kaca (WebGL) dimuat belakangan agar tidak menahan render pertama; sebelum itu tombol polos yang berfungsi sama
const SpecularButton = lazy(() => import('../reactbits/SpecularButton'))

function download() {
  const a = document.createElement('a')
  a.href = profile.cv
  a.download = ''
  a.click()
}

export function DownloadCvButton() {
  const [fancy, setFancy] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setFancy(true), 2500)
    return () => clearTimeout(t)
  }, [])

  const plain = <Button variant="secondary" onClick={download}>Download CV</Button>

  if (!fancy) return plain
  return (
    <Suspense fallback={plain}>
      <SpecularButton size="md" radius={24} tintOpacity={0.1} blur={8} textColor="#ffffff" autoAnimate onClick={download}>
        Download CV
      </SpecularButton>
    </Suspense>
  )
}
