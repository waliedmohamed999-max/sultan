import type { ReactNode } from 'react'
import { AnimatedContainer } from './AnimatedContainer'

type SectionWrapperProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  children: ReactNode
  tone?: 'white' | 'soft' | 'dark'
}

export function SectionWrapper({ eyebrow, title, subtitle, children, tone = 'white' }: SectionWrapperProps) {
  return (
    <section className={`premium-section premium-section-${tone}`}>
      <div className="container">
        <AnimatedContainer className="premium-section-head">
          {eyebrow && <span className="premium-eyebrow">{eyebrow}</span>}
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </AnimatedContainer>
        {children}
      </div>
    </section>
  )
}
