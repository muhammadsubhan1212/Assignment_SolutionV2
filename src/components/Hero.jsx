import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { brand } from '../data/brand'
import { img } from '../data/images'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.15])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-ink-950">
      {/* Full-bleed photographic plane */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <img
          src={img.hero}
          alt={img.heroAlt}
          className="img-cover ken-burns"
          fetchPriority="high"
        />
      </motion.div>

      {/* Readable gradient — left-weighted for brand composition */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(12,22,32,0.92) 0%, rgba(12,22,32,0.72) 42%, rgba(12,22,32,0.28) 68%, rgba(12,22,32,0.45) 100%)',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-mist-50 to-transparent" />

      <motion.div style={{ y, opacity }} className="relative z-10 flex min-h-[100svh] items-end pb-24 pt-36 sm:items-center sm:pb-20 sm:pt-28">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-white"
            >
              {brand.name}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-xl text-[clamp(1.35rem,3.2vw,2rem)] font-medium leading-snug text-white/90"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Academic writing that earns the grade you studied for.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mt-5 max-w-md text-[15px] leading-relaxed text-white/65"
            >
              Subject-matched specialists, transparent pricing in your currency, and drafts you can defend with confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/order-now"
                className="group inline-flex items-center gap-2.5 bg-brass-400 px-6 py-3.5 text-[14px] font-semibold text-ink-950 transition-colors hover:bg-brass-300"
              >
                Start your order
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 border border-white/25 px-6 py-3.5 text-[14px] font-medium text-white/90 transition-colors hover:border-white/50 hover:bg-white/5"
              >
                Explore services
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
