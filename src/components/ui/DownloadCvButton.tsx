import { useState } from 'react'
import { downloadCv } from '../../lib/cv/downloadCv'
import { Button } from './Button'

export function DownloadCvButton() {
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle')

  async function onClick() {
    setState('loading')
    try {
      await downloadCv()
      setState('idle')
    } catch {
      setState('error')
    }
  }

  return (
    <Button variant="secondary" onClick={onClick} disabled={state === 'loading'}>
      {state === 'loading' ? 'Membuat CV...' : state === 'error' ? 'Gagal, coba lagi' : 'Download CV'}
    </Button>
  )
}
