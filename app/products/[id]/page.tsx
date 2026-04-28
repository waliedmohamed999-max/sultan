import { ProductDetailsClient } from './ProductDetailsClient'
import { getProduct, products } from '@/data/products'
import { siteContentDefaults } from '@/data/siteContent'

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }))
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const product = getProduct(params.id)
  return {
    title: product ? `${product.name} | I Natural` : 'منتج غير موجود | I Natural',
    description: product?.description
  }
}

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  return <ProductDetailsClient id={params.id} initialContent={siteContentDefaults} />
}
