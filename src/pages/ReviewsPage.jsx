import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import OrderCTA from '../components/OrderCTA'
import { reviews } from '../data/home'
import { img } from '../data/images'

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
        image={img.library}
      />

      {/* Editorial rating band */}
      <section className="relative isolate overflow-hidden bg-ink-950 py-16 sm:py-20">
        <img src={img.library2} alt="" className="absolute inset-0 img-cover opacity-30" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/92 to-ink-950/70" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-16">
            <div>
              <p className="font-heading text-6xl font-bold tracking-tight text-white sm:text-7xl">4.9</p>
              <div className="mt-3 flex gap-1 text-brass-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-3 text-[13px] text-white/55">Based on 3,400+ reviews</p>
            </div>
            <div className="space-y-2.5">
              {ratingBreakdown.map((r) => (
                <div key={r.stars} className="flex items-center gap-3">
                  <span className="w-12 text-[13px] text-white/50">{r.stars} star</span>
                  <div className="h-1.5 flex-1 overflow-hidden bg-white/10">
                    <div className="h-full bg-brass-400" style={{ width: `${r.pct}%` }} />
                  </div>
                  <span className="w-10 text-right text-[12px] tabular-nums text-white/40">{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote list — editorial, not card grid */}
      <section className="bg-mist-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass-600">Testimonials</p>
          <h2 className="mt-3 font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-ink-950">
            What students say after handoff
          </h2>

          <div className="mt-12 divide-y divide-mist-200 border-y border-mist-200">
            {reviews.map((r, i) => (
              <motion.figure
                key={r.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.05 }}
                className="grid gap-6 py-10 sm:grid-cols-[1fr_auto] sm:gap-12"
              >
                <blockquote>
                  <div className="mb-4 flex gap-0.5 text-brass-500">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={13} fill="currentColor" />
                    ))}
                  </div>
                  <p className="font-heading text-xl font-medium leading-snug text-ink-950 sm:text-2xl">
                    &ldquo;{r.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="flex items-start gap-3 sm:min-w-[180px] sm:justify-end sm:text-right">
                  <span className="order-2 sm:order-1">
                    <span className="block text-[14px] font-semibold text-ink-950">{r.name}</span>
                    <span className="mt-0.5 block text-[12px] text-ink-500">
                      {r.role} · {r.city}
                    </span>
                  </span>
                  <span className="order-1 flex h-10 w-10 shrink-0 items-center justify-center bg-ink-950 text-[12px] font-semibold text-brass-300 sm:order-2">
                    {r.initials}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <OrderCTA title="Join thousands of confident students" />
    </>
  )
}
