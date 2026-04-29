'use client'

import { useSiteContent } from '@/components/cms/useSiteContent'
import { PaymentMethodLogo } from '@/components/ui/PaymentMethodLogo'
import { siteContentDefaults } from '@/data/siteContent'

export default function CheckoutPage() {
  const { content } = useSiteContent(siteContentDefaults)
  const page = content.pages.checkout

  return (
    <section className="section bg-white">
      <div className="container grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <h1 className="section-title">{page.title}</h1>
          <form className="grid gap-4 rounded-lg border p-6">
            <label className="grid gap-2 font-bold">
              {page.fullNameLabel}
              <input className="rounded-md border px-4 py-3" placeholder={page.fullNamePlaceholder} />
            </label>
            <label className="grid gap-2 font-bold">
              {page.phoneLabel}
              <input className="rounded-md border px-4 py-3" placeholder={page.phonePlaceholder} />
            </label>
            <label className="grid gap-2 font-bold">
              {page.addressLabel}
              <textarea className="min-h-28 rounded-md border px-4 py-3" placeholder={page.addressPlaceholder} />
            </label>
            <button className="btn btn-primary" type="button">{page.submitText}</button>
          </form>
        </div>
        <aside className="h-fit rounded-lg bg-surface p-6">
          <h2 className="mb-3 text-2xl font-black text-primary">{page.paymentTitle}</h2>
          <div className="flex flex-wrap gap-2 text-sm font-bold">
            {page.paymentMethods.map((item) => (
              <PaymentMethodLogo key={item} name={item} />
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}
