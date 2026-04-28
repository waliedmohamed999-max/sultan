'use client'

import { ProductGrid } from '@/components/products/ProductGrid'
import { useSiteContent } from '@/components/cms/useSiteContent'
import { categoryLabels, type Category } from '@/data/products'
import type { SiteContent } from '@/data/siteContent'

const categoryKeys = Object.keys(categoryLabels) as Category[]

export function ProductsClient({ initialContent, selected }: { initialContent: SiteContent; selected?: Category }) {
  const { content } = useSiteContent(initialContent)
  const filtered = selected ? content.products.filter((product) => product.category === selected) : content.products
  const page = content.pages.products

  return (
    <section className="premium-section premium-section-white">
      <div className="container">
        <div className="mb-12 max-w-3xl">
          <span className="premium-eyebrow">{page.eyebrow}</span>
          <h1 className="mt-5 text-5xl font-black text-[var(--premium-primary)]">{page.title}</h1>
          <p className="mt-4 text-lg font-bold leading-9 text-black/55">{page.subtitle}</p>
        </div>
        <div className="mb-8 flex flex-wrap gap-2">
          <a className={`premium-btn ${!selected ? 'premium-btn-primary' : 'premium-btn-secondary'}`} href="/products">{page.allLabel}</a>
          {categoryKeys.map((category) => (
            <a key={category} className={`premium-btn ${selected === category ? 'premium-btn-primary' : 'premium-btn-secondary'}`} href={`/products?category=${category}`}>
              {categoryLabels[category]}
            </a>
          ))}
        </div>
        <div className="premium-grid-products"><ProductGrid products={filtered} /></div>
      </div>
    </section>
  )
}
