'use client'

import { Leaf, ShieldCheck, Sparkles } from 'lucide-react'
import { BrandSeal, ProductVisual } from '@/components/products/ProductVisual'
import { useSiteContent } from '@/components/cms/useSiteContent'
import { siteContentDefaults } from '@/data/siteContent'

const icons = [Leaf, ShieldCheck, Sparkles]

export default function AboutPage() {
  const { content } = useSiteContent(siteContentDefaults)
  const page = content.pages.about
  const visualProduct = content.products[11] || content.products[0]

  return (
    <section className="section bg-white">
      <div className="container grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <span className="badge mb-4">{page.badge}</span>
          <h1 className="section-title">{page.title}</h1>
          <p className="text-lg leading-9 text-[#555]">{page.description}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {page.points.map((title, index) => {
              const Icon = icons[index % icons.length]
              return (
                <div key={title} className="rounded-lg bg-surface p-5 text-center font-black text-primary">
                  <Icon className="mx-auto mb-3" />
                  {title}
                </div>
              )
            })}
          </div>
        </div>
        {visualProduct && (
          <div className="about-brand-stage">
            <BrandSeal />
            <ProductVisual product={visualProduct} size="hero" />
          </div>
        )}
      </div>
    </section>
  )
}
