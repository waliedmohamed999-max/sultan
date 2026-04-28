import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Award, Leaf, ShieldCheck, Sparkles } from 'lucide-react'
import { AnimatedContainer } from '@/components/ui/AnimatedContainer'
import type { HeroContent } from '@/data/siteContent'

const heroCards = [
  { icon: Leaf, label: 'طبيعي 100%' },
  { icon: ShieldCheck, label: 'جودة معتمدة' },
  { icon: Award, label: 'منذ 2013' }
]

export function HeroSection({ hero }: { hero: HeroContent }) {
  return (
    <section className="premium-hero">
      <div className="premium-hero-bg" />
      <div className="container premium-hero-grid">
        <AnimatedContainer className="premium-hero-visual">
          <div className="premium-product-stage">
            {hero.image.startsWith('data:') ? (
              <img src={hero.image} alt="سائل تنظيف طبيعي من I Natural" className="premium-product-image" />
            ) : (
              <Image
                src={hero.image}
                alt="سائل تنظيف طبيعي من I Natural"
                fill
                priority
                className="premium-product-image"
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
            )}
            <div className="premium-product-shadow" />
            <div className="premium-glass-card premium-glass-card-a">
              <Leaf size={20} />
              <span>تركيبة نباتية</span>
            </div>
            <div className="premium-glass-card premium-glass-card-b">
              <Sparkles size={20} />
              <span>نظافة عميقة ولمسة ناعمة</span>
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer className="premium-hero-copy" delay={0.12}>
          <span className="premium-hero-badge">
            <Leaf size={16} />
            {hero.badge}
          </span>
          <h1>{hero.headline}</h1>
          <p>
            {hero.description}
          </p>
          <div className="premium-hero-actions">
            <Link href={hero.primaryHref} className="premium-btn premium-btn-primary">
              {hero.primaryCta}
              <ArrowLeft size={18} />
            </Link>
            <Link href={hero.secondaryHref} className="premium-btn premium-btn-secondary">
              {hero.secondaryCta}
            </Link>
          </div>
          <div className="premium-trust-row">
            {heroCards.map((item) => (
              <span key={item.label}>
                <item.icon size={17} />
                {item.label}
              </span>
            ))}
          </div>
        </AnimatedContainer>
      </div>
    </section>
  )
}
