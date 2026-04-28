export function TickerBanner({ messages }: { messages: string[] }) {
  const tickerMessages = messages.length ? messages : ['منتجات طبيعية 100%']

  return (
    <div className="overflow-hidden bg-primary py-2 text-sm font-bold text-white">
      <div className="flex w-max gap-12 whitespace-nowrap px-4" style={{ animation: 'ticker-rtl 22s linear infinite' }}>
        {[...tickerMessages, ...tickerMessages].map((message, index) => (
          <span key={`${message}-${index}`}>{message}</span>
        ))}
      </div>
    </div>
  )
}
