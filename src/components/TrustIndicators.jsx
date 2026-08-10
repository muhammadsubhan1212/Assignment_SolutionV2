import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { atmosphereStrip } from '../data/images'

const trustItems = [
  'Subject-matched writers',
  'Originality checked',
  'On-time delivery',
  'Local-currency quotes',
  'Unlimited revisions',
  '24/7 desk support',
  'APA · MLA · Harvard · Chicago',
  'UK · USA · AU · CA',
]

export default function TrustIndicators() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section ref={ref} className="relative bg-mist-50">
      <div className="border-y border-mist-200/80 bg-white/70 backdrop-blur-sm">
        <div className="overflow-hidden py-4">
          <div className="trust-ticker flex w-max gap-10 whitespace-nowrap px-6">
            {[...trustItems, ...trustItems].map((item, i) => (
              <span key={`${item}-${i}`} className="flex items-center gap-10 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-700">
                {item}
                <span className="h-1 w-1 rounded-full bg-brass-400" aria-hidden />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3"
        >
          {atmosphereStrip.map((src, i) => (
            <div
              key={src}
              className={`relative overflow-hidden ${i === 0 || i === 5 ? 'aspect-[4/5]' : 'aspect-square'} ${i > 3 ? 'hidden sm:block' : ''}`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="img-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
