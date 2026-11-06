import type { ReactNode } from 'react'

type Props = {
  variant?: 'primary' | 'secondary'
  href?: string
  download?: boolean
  children: ReactNode
}

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors'
const styles = {
  primary: 'bg-blue text-white hover:bg-sky hover:text-black',
  secondary: 'border border-white/30 text-white hover:border-sky hover:text-sky',
}

export function Button({ variant = 'primary', href, download, children }: Props) {
  if (!href) {
    return (
      <span aria-disabled="true" className={`${base} ${styles[variant]} cursor-not-allowed opacity-40`}>
        {children}
      </span>
    )
  }
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      download={download}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      className={`${base} ${styles[variant]}`}
    >
      {children}
    </a>
  )
}
