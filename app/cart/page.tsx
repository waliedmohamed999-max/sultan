'use client'

import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { ProductVisual } from '@/components/products/ProductVisual'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCartStore()

  return (
    <section className="section bg-white">
      <div className="container">
        <h1 className="section-title">سلة التسوق</h1>
        {items.length === 0 ? (
          <div className="rounded-lg bg-surface p-8 text-center">
            <p className="mb-5 text-lg font-bold text-[#555]">لا توجد منتجات في السلة حاليا.</p>
            <Link href="/products" className="btn btn-primary">تصفح المنتجات</Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="grid gap-4">
              {items.map((item) => (
                <div key={item.product.id} className="grid gap-4 rounded-lg border p-4 sm:grid-cols-[120px_1fr_auto]">
                  <div className="relative aspect-square overflow-hidden rounded-md bg-surface">
                    <ProductVisual product={item.product} size="thumb" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#183b28]">{item.product.name}</h2>
                    <p className="mt-2 font-black text-primary">{item.product.price} ريال</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="btn btn-outline h-10 w-10 p-0" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}><Plus size={16} /></button>
                    <strong>{item.quantity}</strong>
                    <button className="btn btn-outline h-10 w-10 p-0" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}><Minus size={16} /></button>
                    <button className="btn btn-outline h-10 w-10 p-0 text-sale" onClick={() => removeFromCart(item.product.id)}><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
            <aside className="h-fit rounded-lg bg-surface p-6">
              <h2 className="mb-4 text-2xl font-black text-primary">ملخص الطلب</h2>
              <div className="mb-3 flex justify-between font-bold"><span>المجموع</span><span>{subtotal()} ريال</span></div>
              <div className="mb-5 flex justify-between font-bold"><span>الشحن</span><span>يحسب لاحقا</span></div>
              <Link href="/checkout" className="btn btn-primary w-full">إتمام الطلب</Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}
