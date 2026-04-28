'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2, ShieldCheck } from 'lucide-react'
import { ProductGrid } from '@/components/products/ProductGrid'
import { ProductVisual } from '@/components/products/ProductVisual'
import { useSiteContent } from '@/components/cms/useSiteContent'
import { AddToCartPanel } from './product-actions'
import { categoryLabels } from '@/data/products'
import type { SiteContent } from '@/data/siteContent'

export function ProductDetailsClient({ id, initialContent }: { id: string; initialContent: SiteContent }) {
  const { content } = useSiteContent(initialContent)
  const product = content.products.find((item) => item.id === id)
  if (!product) notFound()
  const related = content.products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4)
  const page = content.pages.productDetails

  return (
    <>
      <section className="premium-section premium-section-white">
        <div className="container grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-[32px] bg-[#edf6ee] shadow-sm">
              <ProductVisual product={product} size="hero" />
            </div>
          </div>
          <div>
            <Link href={`/products?category=${product.category}`} className="premium-eyebrow">{categoryLabels[product.category]}</Link>
            <h1 className="mt-5 text-5xl font-black leading-tight text-[var(--premium-primary)]">{product.name}</h1>
            <p className="mt-5 text-lg font-bold leading-9 text-black/55">{product.description}</p>
            <AddToCartPanel product={product} />
            <div className="mt-8 grid gap-3">
              <h2 className="text-2xl font-black text-[var(--premium-primary)]">{page.featuresTitle}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {product.features.map((feature) => <div key={feature} className="flex items-center gap-2 rounded-2xl bg-[#f5f8f4] p-4 font-bold text-[#244231]"><CheckCircle2 size={18} />{feature}</div>)}
              </div>
            </div>
            {product.certifications && <div className="mt-8 flex flex-wrap gap-2">{product.certifications.map((certification) => <span key={certification} className="premium-eyebrow"><ShieldCheck size={15} /> {certification}</span>)}</div>}
          </div>
        </div>
      </section>
      {related.length > 0 && <section className="premium-section premium-section-soft"><div className="container"><h2 className="mb-10 text-center text-4xl font-black text-[var(--premium-primary)]">{page.relatedTitle}</h2><ProductGrid products={related} /></div></section>}
    </>
  )
}
