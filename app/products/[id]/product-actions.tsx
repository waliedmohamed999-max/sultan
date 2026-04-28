'use client'

import { Heart, ShoppingCart } from 'lucide-react'
import type { Product } from '@/data/products'
import { useCartStore } from '@/store/cartStore'

export function AddToCartPanel({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <div className="mt-7 rounded-lg border bg-[#fbfdfb] p-5">
      <div className="mb-4 flex flex-wrap items-end gap-3">
        <strong className="text-4xl font-black text-primary">{product.price} ريال</strong>
        {product.originalPrice && <span className="pb-1 text-lg text-[#777] line-through">{product.originalPrice} ريال</span>}
      </div>
      <p className="mb-5 font-bold text-[#555]">الشحن مجاني على الطلبات فوق 250 ريال</p>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <button className="btn btn-primary" disabled={!product.inStock} onClick={() => addToCart(product)}>
          <ShoppingCart size={18} />
          أضف للسلة
        </button>
        <button className="btn btn-outline">
          <Heart size={18} />
          إضافة للمفضلة
        </button>
      </div>
      {!product.inStock && <p className="mt-3 font-bold text-sale">هذا المنتج غير متوفر حاليا.</p>}
    </div>
  )
}
