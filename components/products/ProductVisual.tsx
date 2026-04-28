import { Droplets, Leaf, Package, Sparkles } from 'lucide-react'
import type { Product } from '@/data/products'

const visualByCategory = {
  cleaning: {
    className: 'visual-cleaning',
    label: 'Clean',
    icon: Droplets
  },
  care: {
    className: 'visual-care',
    label: 'Care',
    icon: Sparkles
  },
  wipes: {
    className: 'visual-wipes',
    label: 'Wipes',
    icon: Leaf
  },
  dental: {
    className: 'visual-dental',
    label: 'Dental',
    icon: Sparkles
  },
  bundle: {
    className: 'visual-bundle',
    label: 'Bundle',
    icon: Package
  }
} as const

export function ProductVisual({ product, size = 'card' }: { product: Product; size?: 'card' | 'hero' | 'thumb' }) {
  const visual = visualByCategory[product.category]
  const Icon = visual.icon

  if (product.image) {
    return (
      <div className={`product-visual product-visual-image product-visual-${size}`} aria-hidden="true">
        <img src={product.image} alt="" />
      </div>
    )
  }

  return (
    <div className={`product-visual ${visual.className} product-visual-${size}`} aria-hidden="true">
      <span className="visual-leaf visual-leaf-a" />
      <span className="visual-leaf visual-leaf-b" />
      <span className="visual-glow" />
      <div className="visual-pack">
        <div className="visual-cap" />
        <div className="visual-label">
          <span className="visual-logo">
            <Leaf size={16} />
            iNatural
          </span>
          <strong>{visual.label}</strong>
          <small>{product.weight || '100% طبيعي'}</small>
        </div>
        <div className="visual-bottom">
          <Icon size={18} />
          <span>Natural</span>
        </div>
      </div>
    </div>
  )
}

export function BrandSeal() {
  return (
    <div className="brand-seal" aria-hidden="true">
      <span className="brand-ring" />
      <span className="brand-leaf brand-leaf-1" />
      <span className="brand-leaf brand-leaf-2" />
      <strong>iNatural</strong>
      <small>Clean & Care</small>
    </div>
  )
}
