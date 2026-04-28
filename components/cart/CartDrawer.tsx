'use client'

import Link from 'next/link'
import { Minus, Plus, Trash2, X } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { ProductVisual } from '@/components/products/ProductVisual'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, subtotal } = useCartStore()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/35" onClick={closeCart}>
      <aside
        className="mr-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        aria-label="سلة التسوق"
      >
        <div className="flex items-center justify-between border-b p-5">
          <strong className="text-xl font-black text-primary">سلة التسوق</strong>
          <button className="btn btn-outline h-10 w-10 p-0" onClick={closeCart} aria-label="إغلاق السلة">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-5">
          {items.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <p className="text-lg font-bold text-[#555]">السلة فارغة</p>
                <Link href="/products" className="btn btn-primary mt-4" onClick={closeCart}>
                  تصفح المنتجات
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {items.map((item) => (
                <div key={item.product.id} className="grid grid-cols-[84px_1fr] gap-3 rounded-lg border p-3">
                  <div className="relative aspect-square overflow-hidden rounded-md bg-surface">
                    <ProductVisual product={item.product} size="thumb" />
                  </div>
                  <div>
                    <h3 className="font-black leading-6 text-[#183b28]">{item.product.name}</h3>
                    <p className="mt-1 font-bold text-primary">{item.product.price} ريال</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center overflow-hidden rounded-md border">
                        <button className="grid h-9 w-9 place-items-center" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} aria-label="زيادة">
                          <Plus size={16} />
                        </button>
                        <span className="grid h-9 min-w-9 place-items-center border-x px-2 font-bold">{item.quantity}</span>
                        <button className="grid h-9 w-9 place-items-center" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} aria-label="تقليل">
                          <Minus size={16} />
                        </button>
                      </div>
                      <button className="grid h-9 w-9 place-items-center rounded-md text-sale" onClick={() => removeFromCart(item.product.id)} aria-label="حذف">
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t p-5">
          <div className="mb-4 flex items-center justify-between text-lg font-black">
            <span>الإجمالي</span>
            <span className="text-primary">{subtotal()} ريال</span>
          </div>
          <Link href="/checkout" className="btn btn-primary w-full" onClick={closeCart}>
            إتمام الطلب
          </Link>
        </div>
      </aside>
    </div>
  )
}
