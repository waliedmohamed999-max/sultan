import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'

export const metadata: Metadata = {
  title: 'I Natural | متجر أنا طبيعي',
  description: 'متجر عربي RTL لمنتجات التنظيف والعناية الطبيعية من I Natural.',
  keywords: ['I Natural', 'أنا طبيعي', 'منتجات طبيعية', 'منظفات طبيعية', 'عناية طبيعية']
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
