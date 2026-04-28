'use client'

import Link from 'next/link'
import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { siteContentDefaults } from '@/data/siteContent'
import { useSiteContent } from '@/components/cms/useSiteContent'
import { TickerBanner } from './TickerBanner'

export function Header() {
  const { content } = useSiteContent(siteContentDefaults)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartPreview, setCartPreview] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const openCart = useCartStore((state) => state.openCart)
  const count = useCartStore((state) => state.totalItems())
  const subtotal = useCartStore((state) => state.subtotal())
  const items = useCartStore((state) => state.items)
  const navItems = content.header.navLinks

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="premium-header">
      <TickerBanner messages={content.header.tickerMessages} />
      <div className="premium-nav-wrap">
        <div className="container premium-nav">
          <Link href="/" className="premium-logo" aria-label="I Natural">
            <span>iN</span>
            <strong>
              {content.header.brandName}
              <small>{content.header.brandSubline}</small>
            </strong>
          </Link>

          <nav className="premium-nav-links">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? 'is-active' : ''}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="premium-nav-actions">
            <button className="premium-icon-btn" aria-label="بحث">
              <Search size={18} />
            </button>
            <Link className="premium-icon-btn hidden sm:grid" href="/auth/login" aria-label="حسابي">
              <UserRound size={18} />
            </Link>
            <div
              className="premium-cart-wrap"
              onMouseEnter={() => setCartPreview(true)}
              onMouseLeave={() => setCartPreview(false)}
            >
              <button className="premium-icon-btn premium-cart-main" aria-label="السلة" onClick={openCart}>
                <ShoppingBag size={18} />
                {mounted && count > 0 && <span>{count}</span>}
              </button>
              {mounted && cartPreview && (
                <div className="premium-cart-preview">
                  <strong>سلة التسوق</strong>
                  {items.length === 0 ? (
                    <p>السلة فارغة حاليا.</p>
                  ) : (
                    <>
                      <p>{count} منتج في السلة</p>
                      <small>{subtotal} ريال</small>
                    </>
                  )}
                </div>
              )}
            </div>
            <button className="premium-icon-btn lg:hidden" aria-label="القائمة" onClick={() => setMobileOpen(true)}>
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="premium-mobile-backdrop" onClick={() => setMobileOpen(false)}>
          <div className="premium-mobile-menu" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between">
              <strong>{content.header.brandName}</strong>
              <button className="premium-icon-btn" onClick={() => setMobileOpen(false)} aria-label="إغلاق">
                <X size={18} />
              </button>
            </div>
            <nav>
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
