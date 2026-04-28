import Link from 'next/link'
import type { CategoryItem } from '@/data/categories'
import { ArrowLeft } from 'lucide-react'

export function CategoryCard({ category }: { category: CategoryItem }) {
  return (
    <Link href={category.path} className="premium-category-card">
      <img
        src={category.image}
        alt={category.title}
        className="premium-category-image"
      />
      <span className="premium-category-overlay" />
      <span className="premium-category-content">
        <strong>{category.title}</strong>
        <small>{category.subtitle}</small>
        <em>
          استكشاف
          <ArrowLeft size={16} />
        </em>
      </span>
    </Link>
  )
}
