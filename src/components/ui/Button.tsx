import type { ReactNode } from 'react'

type Props = {
  variant?: 'primary' | 'secondary' | 'light'
  href?: string
  onClick?: () => void
  disabled?: boolean
  children: ReactNode
}

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-7 text-base font-medium leading-none transition-colors'
const styles = {
  primary: 'bg-blue text-white hover:bg-sky hover:text-black',
  secondary: 'border border-white/30 text-white hover:border-sky hover:text-sky',
  light: 'bg-white text-black hover:bg-sky',
}
const off = 'cursor-not-allowed opacity-40'

export function Button({ variant = 'primary', href, onClick, disabled, children }: Props) {
  const cls = `${base} ${styles[variant]}`
  if (onClick) {
    return (
      <button type="button" onClick={onClick} disabled={disabled} className={`${cls} ${disabled ? off : ''}`}>
        {children}
      </button>
    )
  }
  if (!href) {
    return (
      <span aria-disabled="true" className={`${cls} ${off}`}>
        {children}
      </span>
    )
  }
  const external = href.startsWith('http')
  return (
    <a href={href} {...(external && { target: '_blank', rel: 'noopener noreferrer' })} className={cls}>
      {children}
    </a>
  )
}
