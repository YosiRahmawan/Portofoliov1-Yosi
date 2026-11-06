import { useState } from 'react'
import { downloadCv } from '../../lib/cv/downloadCv'
import SpecularButton from '../reactbits/SpecularButton'

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
    <SpecularButton
      size="md"
      radius={24}
      tintOpacity={0.1}
      blur={8}
      textColor="#ffffff"
      autoAnimate
      onClick={onClick}
      disabled={state === 'loading'}
    >
      {state === 'loading' ? 'Membuat CV...' : state === 'error' ? 'Gagal, coba lagi' : 'Download CV'}
    </SpecularButton>
  )
}
