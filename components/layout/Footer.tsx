import Link from 'next/link'
import { Instagram, Mail, Phone, ShieldCheck, Smartphone, Youtube } from 'lucide-react'
import { PaymentMethodLogo } from '@/components/ui/PaymentMethodLogo'

export function Footer() {
  return (
    <footer className="premium-footer">
      <div className="container premium-footer-grid">
        <div>
          <h2>I Natural</h2>
          <p>
            علامة سعودية تقدم منتجات تنظيف وعناية طبيعية بتجربة هادئة، موثوقة، ومصممة لحياة يومية أكثر نقاء.
          </p>
          <div className="premium-socials">
            <span><Youtube size={18} /></span>
            <span><Instagram size={18} /></span>
            <span>𝕏</span>
          </div>
        </div>

        <div>
          <h3>روابط</h3>
          <Link href="/products">كل المنتجات</Link>
          <Link href="/about">من نحن</Link>
          <Link href="/blog">المدونة</Link>
          <Link href="/cart">السلة</Link>
        </div>

        <div>
          <h3>تواصل</h3>
          <p><Smartphone size={16} /> +966581622363</p>
          <p><Phone size={16} /> +966 920020454</p>
          <p><Mail size={16} /> info@inaturl.com</p>
        </div>

        <div>
          <h3>الثقة والدفع</h3>
          <p><ShieldCheck size={16} /> ISO 22000 وHACCP</p>
          <div className="premium-payments">
            {['Visa', 'Mada', 'Apple Pay', 'STC Pay', 'Tabby', 'Cash'].map((item) => (
              <PaymentMethodLogo key={item} name={item} />
            ))}
          </div>
        </div>
      </div>
      <div className="premium-footer-bottom">INatural 2026 | جميع الحقوق محفوظة</div>
    </footer>
  )
}
