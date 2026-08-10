import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check } from 'lucide-react'
import PriceCalculator from './PriceCalculator'
import { img } from '../data/images'

const pricingPoints = [
  {
    title: 'Priced by level & length',
    body: 'Undergraduate, Master, and PhD each have a base rate. You only pay for the pages you need.',
  },
  {
    title: 'Urgency you control',
    body: 'From a relaxed 15 days to a 6-hour rush — the deadline you pick adjusts the rate transparently.',
  },
  {
    title: 'Your currency, our maths',
    body: 'Prices are billed in USD but shown live in your local currency using real exchange rates.',
  },
]

const included = [
  'Plagiarism report included',
  'Free revisions in the policy window',
  'Subject-matched specialist writer',
  'Direct coordinator updates',
]

export default function Pricing() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="pricing" className="relative overflow-hidden bg-mist-50 py-24 sm:py-32">
      <div className="absolute inset-y-0 right-0 hidden w-1/3 lg:block">
        <img src={img.orderLaptop} alt="" className="img-cover opacity-90" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-mist-50" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass-600">Pricing</p>
          <h2 className="mt-3 font-heading text-[clamp(2rem,4vw,3.25rem)] font-semibold text-ink-950">
            Transparent quotes, in your currency
          </h2>
        </motion.div>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="space-y-7">
              {pricingPoints.map((p) => (
                <div key={p.title} className="border-l-2 border-brass-400 pl-5">
                  <h3 className="font-heading text-xl font-semibold text-ink-950">{p.title}</h3>
                  <p className="mt-2 max-w-sm text-[14.5px] leading-relaxed text-ink-600">{p.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-white p-6 ring-1 ring-mist-200">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400">Every order includes</p>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {included.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass-600" />
                    <span className="text-sm text-ink-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative z-10"
          >
            <PriceCalculator />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
