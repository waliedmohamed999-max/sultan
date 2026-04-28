'use client'

import Link from 'next/link'
import { Eye, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { calculateDiscount, type Product } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import { ProductVisual } from './ProductVisual'

export function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart)
  const discount = calculateDiscount(product)

  return (
    <motion.article className="premium-product-card" whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
      <Link href={`/products/${product.id}`} className="premium-product-media" aria-label={product.name}>
        <ProductVisual product={product} />
        <span className="premium-product-badge">{discount ? `خصم ${discount}%` : 'طبيعي'}</span>
        {!product.inStock && <span className="premium-stock-overlay">نفدت الكمية</span>}
        <span className="premium-product-overlay">
          <span>
            <Eye size={18} />
            عرض سريع
          </span>
        </span>
      </Link>

      <div className="premium-product-body">
        <div className="premium-product-meta">
          <span>100% طبيعي</span>
          {product.weight && <span>{product.weight}</span>}
        </div>
        <Link href={`/products/${product.id}`}>
          <h3 title={product.name}>{product.name}</h3>
        </Link>
        <div className="premium-product-foot">
          <div>
            <strong>{product.price} ريال</strong>
            {product.originalPrice && <small>{product.originalPrice} ريال</small>}
          </div>
          <button
            className="premium-cart-btn"
            disabled={!product.inStock}
            onClick={() => addToCart(product)}
            aria-label={`أضف ${product.name} للسلة`}
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </motion.article>
  )
}
