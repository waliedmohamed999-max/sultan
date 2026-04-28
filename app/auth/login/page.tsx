'use client'

import Link from 'next/link'
import { ArrowLeft, Leaf, LockKeyhole, ShieldCheck } from 'lucide-react'
import { useSiteContent } from '@/components/cms/useSiteContent'
import { siteContentDefaults } from '@/data/siteContent'

const pointIcons = [Leaf, LockKeyhole, ShieldCheck]

export default function LoginPage() {
  const { content } = useSiteContent(siteContentDefaults)
  const page = content.pages.login

  return (
    <section className="premium-auth">
      <div className="premium-auth-bg" />
      <div className="container premium-auth-grid">
        <div className="premium-auth-copy">
          <span className="premium-eyebrow">
            <ShieldCheck size={15} />
            {page.eyebrow}
          </span>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
          <div className="premium-auth-points">
            {page.points.map((point, index) => {
              const Icon = pointIcons[index % pointIcons.length]
              return <span key={point}><Icon size={18} /> {point}</span>
            })}
          </div>
        </div>

        <form className="premium-auth-card">
          <div>
            <h2>{page.cardTitle}</h2>
            <p>{page.cardDescription}</p>
          </div>

          <label>
            {page.emailLabel}
            <input type="email" defaultValue="admin@inatural.local" placeholder="name@example.com" />
          </label>

          <label>
            {page.passwordLabel}
            <input type="password" defaultValue="inatural-admin" placeholder="••••••••" />
          </label>

          <Link href="/dashboard" className="premium-btn premium-btn-primary w-full">
            {page.submitText}
            <ArrowLeft size={18} />
          </Link>

          <Link href="/auth/register" className="premium-auth-link">
            {page.registerLinkText}
          </Link>
        </form>
      </div>
    </section>
  )
}
