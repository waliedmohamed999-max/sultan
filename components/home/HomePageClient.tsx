'use client'

import Link from 'next/link'
import { Award, CheckCircle2, Leaf, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { HeroSection } from '@/components/home/HeroSection'
import { CategoryCard } from '@/components/products/CategoryCard'
import { ProductGrid } from '@/components/products/ProductGrid'
import { StarRating } from '@/components/ui/StarRating'
import { AnimatedContainer } from '@/components/ui/AnimatedContainer'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { useSiteContent } from '@/components/cms/useSiteContent'
import type { SiteContent } from '@/data/siteContent'

const whyIcons = [Leaf, ShieldCheck, Sparkles]

export function HomePageClient({ initialContent }: { initialContent: SiteContent }) {
  const { content } = useSiteContent(initialContent)
  const saleProducts = content.products.filter((product) => product.category === 'bundle').slice(0, 2)
  const featuredProducts = content.products.slice(0, 8)
  const visible = content.home.sectionVisibility

  return (
    <>
      <HeroSection hero={content.hero} />

      {visible.offers && <SectionWrapper eyebrow={content.home.offers.eyebrow} title={content.home.offers.title} subtitle={content.home.offers.subtitle}>
        <AnimatedContainer className="premium-grid-products"><ProductGrid products={saleProducts} /></AnimatedContainer>
      </SectionWrapper>}

      {visible.collections && <SectionWrapper eyebrow={content.home.collections.eyebrow} title={content.home.collections.title} subtitle={content.home.collections.subtitle} tone="soft">
        <AnimatedContainer className="premium-category-grid">
          {content.categories.map((category) => <CategoryCard key={category.id} category={category} />)}
        </AnimatedContainer>
      </SectionWrapper>}

      {visible.bestSellers && <SectionWrapper eyebrow={content.home.bestSellers.eyebrow} title={content.home.bestSellers.title} subtitle={content.home.bestSellers.subtitle}>
        <AnimatedContainer className="premium-grid-products"><ProductGrid products={featuredProducts} /></AnimatedContainer>
      </SectionWrapper>}

      {visible.why && <SectionWrapper eyebrow={content.home.why.eyebrow} title={content.home.why.title} subtitle={content.home.why.subtitle} tone="dark">
        <div className="premium-why-grid">
          {content.home.whyItems.map((item, index) => {
            const Icon = whyIcons[index % whyIcons.length]
            return (
            <AnimatedContainer key={item.title} className="premium-why-card" delay={index * 0.08}>
              <Icon size={30} /><h3>{item.title}</h3><p>{item.text}</p>
            </AnimatedContainer>
            )
          })}
        </div>
      </SectionWrapper>}

      {visible.certifications && <SectionWrapper eyebrow={content.home.certifications.eyebrow} title={content.home.certifications.title} subtitle={content.home.certifications.subtitle} tone="soft">
        <div className="premium-cert-grid">
          {content.home.certificationItems.map((item, index) => (
            <AnimatedContainer key={item} className="premium-cert-card" delay={index * 0.08}>
              <Award /><strong>{item}</strong><span>جودة موثقة</span>
            </AnimatedContainer>
          ))}
        </div>
      </SectionWrapper>}

      {visible.testimonials && <SectionWrapper eyebrow={content.home.testimonials.eyebrow} title={content.home.testimonials.title} subtitle={content.home.testimonials.subtitle}>
        <div className="premium-testimonial-grid">
          {content.reviews.map((review, index) => (
            <AnimatedContainer key={`${review.name}-${index}`} className="premium-testimonial-card" delay={index * 0.08}>
              <StarRating rating={review.rating} /><p>{review.comment}</p><strong>{review.name}</strong>
            </AnimatedContainer>
          ))}
        </div>
      </SectionWrapper>}

      {visible.journal && <SectionWrapper eyebrow={content.home.journal.eyebrow} title={content.home.journal.title} subtitle={content.home.journal.subtitle} tone="soft">
        <div className="premium-blog-grid">
          {content.blogPosts.map((post, index) => (
            <AnimatedContainer key={post.slug} className="premium-blog-card" delay={index * 0.08}>
              <CheckCircle2 /><h3>{post.title}</h3><p>{post.excerpt}</p><Link href={`/blog/${post.slug}`}>قراءة المقال</Link>
            </AnimatedContainer>
          ))}
        </div>
      </SectionWrapper>}

      {visible.cta && <section className="premium-cta-band">
        <div className="container">
          <Truck /><h2>{content.home.cta.title}</h2>
          <p>{content.home.cta.description}</p>
          <Link href={content.home.cta.buttonHref} className="premium-btn premium-btn-primary">{content.home.cta.buttonText}</Link>
        </div>
      </section>}
    </>
  )
}
