export default function TrustIndicators() {
  const items = [
    '15,000+ ORDERS',
    '4.9/5 RATING',
    '98% ON-TIME',
    '300+ WRITERS',
    '0% PLAGIARISM',
    'FREE REVISIONS',
    '24/7 SUPPORT',
  ]

  const row = items.map((item, i) => (
    <span key={i} className="flex items-center gap-6 shrink-0">
      <span className="font-mono text-[11px] tracking-[0.2em] text-neutral-500 uppercase whitespace-nowrap">
        {item}
      </span>
      <span className="w-1 h-1 rounded-full bg-neutral-300" aria-hidden="true" />
    </span>
  ))

  return (
    <section className="h-12 border-t border-b border-neutral-200 bg-[#fafafa] overflow-hidden flex items-center">
      <div
        className="flex items-center gap-6"
        style={{ animation: 'ticker 30s linear infinite', width: 'max-content' }}
      >
        <div className="flex items-center gap-6 shrink-0">
          {row}
        </div>
        <div className="flex items-center gap-6 shrink-0" aria-hidden="true">
          {row}
        </div>
      </div>
    </section>
  )
}
