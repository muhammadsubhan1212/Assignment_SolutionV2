import { BadgeCheck, ShieldCheck, Clock, Globe2, RefreshCw, Headphones, BookMarked, GraduationCap } from 'lucide-react'

const trustItems = [
  { icon: GraduationCap, label: 'Subject-matched writers' },
  { icon: ShieldCheck, label: 'Originality checked' },
  { icon: Clock, label: 'On-time delivery' },
  { icon: Globe2, label: 'Local-currency quotes' },
  { icon: RefreshCw, label: 'Free revisions' },
  { icon: Headphones, label: '24/7 desk support' },
  { icon: BookMarked, label: 'APA · MLA · Harvard · Chicago' },
  { icon: BadgeCheck, label: '100% confidential' },
]

export default function TrustIndicators() {
  return (
    <section aria-label="Why students trust us" className="relative w-full overflow-hidden border-b border-mist-200/70 bg-white">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32" />
      <div className="py-5">
        <div className="trust-ticker flex w-max gap-12 whitespace-nowrap px-6">
          {[...trustItems, ...trustItems].map(({ icon: Icon, label }, i) => (
            <span key={`${label}-${i}`} className="flex items-center gap-2.5 text-[13.5px] font-semibold text-ink-700" aria-hidden={i >= trustItems.length}>
              <Icon size={17} className="text-brass-500" strokeWidth={1.8} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
