import { Banknote } from 'lucide-react'

function normalizePaymentName(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function PaymentMethodLogo({ name }: { name: string }) {
  const key = normalizePaymentName(name)

  if (key.includes('master')) {
    return (
      <span className="payment-logo payment-logo-mastercard" aria-label={name}>
        <i />
        <b />
        <strong>Mastercard</strong>
      </span>
    )
  }

  if (key.includes('visa')) {
    return (
      <span className="payment-logo payment-logo-visa" aria-label={name}>
        VISA
      </span>
    )
  }

  if (key.includes('mada')) {
    return (
      <span className="payment-logo payment-logo-mada" aria-label={name}>
        <strong>mada</strong>
        <em />
      </span>
    )
  }

  if (key.includes('apple')) {
    return (
      <span className="payment-logo payment-logo-apple" aria-label={name}>
        <span>Apple</span>
        <strong>Pay</strong>
      </span>
    )
  }

  if (key.includes('stc')) {
    return (
      <span className="payment-logo payment-logo-stc" aria-label={name}>
        stc <strong>pay</strong>
      </span>
    )
  }

  if (key.includes('tabby')) {
    return (
      <span className="payment-logo payment-logo-tabby" aria-label={name}>
        tabby
      </span>
    )
  }

  if (key.includes('cash') || key.includes('cod') || name.includes('نقد')) {
    return (
      <span className="payment-logo payment-logo-cash" aria-label={name}>
        <Banknote size={22} />
        <strong>Cash</strong>
      </span>
    )
  }

  return (
    <span className="payment-logo payment-logo-generic" aria-label={name}>
      {name}
    </span>
  )
}
