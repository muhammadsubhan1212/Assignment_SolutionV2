import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check, Globe, Layers, Clock } from 'lucide-react'
import PriceCalculator from './PriceCalculator'

const pricingPoints = [
  {
    icon: Layers,
    title: 'Priced by level & length',
    body: 'Undergraduate, Master, and PhD each have a base rate. You only pay for the pages you need.',
  },
  {
    icon: Clock,
    title: 'Urgency you control',
    body: 'From a relaxed 15 days to a 6-hour rush — the deadline you pick adjusts the rate transparently.',
  },
  {
    icon: Globe,
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
    <section id="pricing" className="py-28 sm:py-36" style={{ backgroundColor: '#fffbf0' }}>
      <div ref={ref} className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-neutral-500">Pricing</p>
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Transparent quotes, in your currency
          </h2>
        </motion.div>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          {/* Left: explanation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="space-y-7">
              {pricingPoints.map((p) => {
                const Icon = p.icon
                return (
                  <div key={p.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-neutral-200/70">
                      <Icon className="h-5 w-5 text-neutral-700" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-neutral-900">{p.title}</h3>
                      <p className="mt-1 max-w-sm text-sm leading-relaxed text-neutral-500">{p.body}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 rounded-2xl border border-neutral-200/70 bg-white/70 p-6 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Every order includes</p>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {included.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span className="text-sm text-neutral-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: live calculator */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <PriceCalculator />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
