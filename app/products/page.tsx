import { ProductsClient } from './ProductsClient'
import { type Category } from '@/data/products'
import { siteContentDefaults } from '@/data/siteContent'

export default function ProductsPage({ searchParams }: { searchParams: { category?: Category } }) {
  return <ProductsClient initialContent={siteContentDefaults} selected={searchParams.category} />
}
