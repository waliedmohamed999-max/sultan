'use client'

import Link from 'next/link'
import { ArrowLeft, Leaf, ShieldCheck } from 'lucide-react'
import { useSiteContent } from '@/components/cms/useSiteContent'
import { siteContentDefaults } from '@/data/siteContent'

export default function RegisterPage() {
  const { content } = useSiteContent(siteContentDefaults)
  const page = content.pages.register

  return (
    <section className="premium-auth">
      <div className="premium-auth-bg" />
      <div className="container premium-auth-grid">
        <div className="premium-auth-copy">
          <span className="premium-eyebrow">
            <Leaf size={15} />
            {page.eyebrow}
          </span>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
        </div>

        <form className="premium-auth-card">
          <div>
            <h2>{page.cardTitle}</h2>
            <p>{page.cardDescription}</p>
          </div>

          <label>
            {page.nameLabel}
            <input placeholder={page.namePlaceholder} />
          </label>
          <label>
            {page.emailLabel}
            <input type="email" placeholder="name@example.com" />
          </label>
          <label>
            {page.passwordLabel}
            <input type="password" placeholder="••••••••" />
          </label>

          <button className="premium-btn premium-btn-primary w-full" type="button">
            {page.submitText}
            <ShieldCheck size={18} />
          </button>

          <Link href="/auth/login" className="premium-auth-link">
            {page.loginLinkText}
            <ArrowLeft size={16} />
          </Link>
        </form>
      </div>
    </section>
  )
}
