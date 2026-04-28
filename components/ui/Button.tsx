import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'outline'
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-outline'} ${className}`} {...props}>
      {children}
    </button>
  )
}
