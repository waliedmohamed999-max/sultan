import { Star } from 'lucide-react'

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-[#f5a524]" aria-label={`${rating} من 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={17} fill={index < rating ? 'currentColor' : 'none'} />
      ))}
    </div>
  )
}
