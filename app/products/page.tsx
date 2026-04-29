import { Suspense } from 'react'
import { ProductsClient } from './ProductsClient'
import { siteContentDefaults } from '@/data/siteContent'

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsClient initialContent={siteContentDefaults} />
    </Suspense>
  )
}
