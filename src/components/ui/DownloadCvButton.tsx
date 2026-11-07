import { lazy, Suspense, useEffect, useState } from 'react'
import { downloadCv } from '../../lib/cv/downloadCv'
import { Button } from './Button'

// Efek kaca (WebGL) dimuat belakangan agar tidak menahan render pertama; sebelum itu tombol polos yang berfungsi sama
const SpecularButton = lazy(() => import('../reactbits/SpecularButton'))

export function DownloadCvButton() {
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle')
  const [fancy, setFancy] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setFancy(true), 2500)
    return () => clearTimeout(t)
  }, [])

  async function onClick() {
    setState('loading')
    try {
      await downloadCv()
      setState('idle')
    } catch {
      setState('error')
    }
  }

  const label = state === 'loading' ? 'Generating CV...' : state === 'error' ? 'Failed, try again' : 'Download CV'
  const plain = (
    <Button variant="secondary" onClick={onClick} disabled={state === 'loading'}>
      {label}
    </Button>
  )

  if (!fancy) return plain
  return (
    <Suspense fallback={plain}>
      <SpecularButton size="md" radius={24} tintOpacity={0.1} blur={8} textColor="#ffffff" autoAnimate onClick={onClick} disabled={state === 'loading'}>
        {label}
      </SpecularButton>
    </Suspense>
  )
}
