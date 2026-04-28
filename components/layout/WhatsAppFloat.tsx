import { MessageCircle } from 'lucide-react'

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/966581622363"
      className="fixed bottom-5 left-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg"
      aria-label="تواصل واتساب"
    >
      <MessageCircle size={26} />
    </a>
  )
}
