import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import OrderCTA from '../components/OrderCTA'
import { reviews } from '../data/home'

const ratingBreakdown = [
  { stars: 5, pct: 92 },
  { stars: 4, pct: 6 },
  { stars: 3, pct: 1.5 },
  { stars: 2, pct: 0.3 },
  { stars: 1, pct: 0.2 },
]

export default function ReviewsPage() {
  return (
    <>
      <Seo
        title="Reviews"
        description="Read what students across the UK, USA, Australia, Canada and beyond say about working with Assignment Solution."
        path="/reviews"
      />
      <PageHeader
        eyebrow="Student voices"
        title="Reviews from students worldwide"
        subtitle="Real feedback from the students we've supported across dozens of universities and timezones."
        crumbs={[{ label: 'Reviews' }]}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Rating summary */}
        <div className="mb-12 grid gap-8 rounded-3xl border border-neutral-200/80 bg-white p-8 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-12">
          <div className="text-center sm:border-r sm:border-neutral-100 sm:pr-12">
            <p className="font-heading text-6xl font-bold tracking-tight text-neutral-900">4.9</p>
            <div className="mt-2 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="mt-2 text-[13px] text-neutral-500">Based on 3,400+ reviews</p>
          </div>
          <div className="space-y-2">
            {ratingBreakdown.map((r) => (
              <div key={r.stars} className="flex items-center gap-3">
                <span className="w-10 text-[13px] text-neutral-500">{r.stars} star</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
                  <div className="h-full rounded-full bg-neutral-900" style={{ width: `${r.pct}%` }} />
                </div>
                <span className="w-10 text-right text-[12px] tabular-nums text-neutral-400">{r.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
              className="flex flex-col rounded-2xl border border-neutral-200/80 bg-white p-6"
            >
              <div className="mb-3 flex gap-0.5">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={13} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="flex-1 text-[14.5px] leading-relaxed text-neutral-600">&ldquo;{r.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-neutral-100 pt-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-[12px] font-semibold text-white">
                  {r.initials}
                </span>
                <span>
                  <span className="block text-[13.5px] font-semibold text-neutral-900">{r.name}</span>
                  <span className="block text-[12px] text-neutral-400">
                    {r.role} · {r.city}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <OrderCTA title="Join thousands of confident students" />
    </>
  )
}
