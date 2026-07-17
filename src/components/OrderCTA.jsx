import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'

export default function OrderCTA({
  title = 'Ready to start your project?',
  body = 'Share your brief and deadline — we map next steps with a writer who knows your field.',
  primaryLabel = 'Start an order',
  primaryTo = '/order-now',
  secondaryLabel = 'Talk to us',
  secondaryTo = '/contact-us',
}) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section ref={ref} className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[28px] bg-neutral-900 px-8 py-12 sm:px-12 sm:py-14"
        >
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet-600/20 blur-[90px]" />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-400">{body}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                to={primaryTo}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
              >
                {primaryLabel}
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to={secondaryTo}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
