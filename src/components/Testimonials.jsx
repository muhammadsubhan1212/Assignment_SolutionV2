import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { reviews } from '../data/home'
import { img } from '../data/images'

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [index, setIndex] = useState(0)
  const review = reviews[index]

  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length)
  const next = () => setIndex((i) => (i + 1) % reviews.length)

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink-950 py-24 sm:py-32">
      <img
        src={img.library2}
        alt=""
        className="absolute inset-0 img-cover opacity-30"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/92 to-ink-950/70" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass-300">Reviews</p>
            <h2 className="mt-3 font-heading text-[clamp(2rem,4vw,3.1rem)] font-semibold text-white">
              Voices from campuses worldwide
            </h2>
            <div className="mt-8 flex gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous review"
                className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-brass-400 hover:text-brass-300"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next review"
                className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-brass-400 hover:text-brass-300"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={review.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="mb-5 flex gap-1 text-brass-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="font-heading text-[clamp(1.35rem,2.8vw,2rem)] font-medium leading-snug text-white">
                “{review.quote}”
              </p>
              <footer className="mt-8">
                <p className="text-[15px] font-semibold text-white">{review.name}</p>
                <p className="mt-1 text-[13px] text-white/55">
                  {review.role} · {review.city}
                </p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
