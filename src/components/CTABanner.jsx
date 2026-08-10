import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'
import { img } from '../data/images'
import { brand } from '../data/brand'

export default function CTABanner() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section ref={ref} className="relative isolate overflow-hidden py-28 sm:py-36">
      <img src={img.studentRelaxing} alt="" className="absolute inset-0 img-cover" loading="lazy" />
      <div className="absolute inset-0 bg-ink-950/78" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading text-[clamp(1.1rem,2.5vw,1.4rem)] font-medium text-brass-300"
        >
          {brand.name}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-heading text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.05] text-white"
        >
          Clear writing. Confident grades.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-10"
        >
          <Link
            to="/order-now"
            className="group inline-flex items-center gap-2.5 bg-brass-400 px-8 py-4 text-[14px] font-semibold text-ink-950 transition-colors hover:bg-brass-300"
          >
            Place an order
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
