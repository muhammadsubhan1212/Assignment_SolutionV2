import { motion } from 'framer-motion'
import { Check, Layers, Timer, Globe2 } from 'lucide-react'
import PriceCalculator from './PriceCalculator'
import SectionHeading from './SectionHeading'

const pricingPoints = [
  {
    icon: Layers,
    title: 'Priced by level & length',
    body: 'Undergraduate, Master and PhD each have a base rate. You only pay for the words you need.',
  },
  {
    icon: Timer,
    title: 'Urgency you control',
    body: 'From a relaxed 15 days to a 6-hour rush — the deadline you pick adjusts the rate transparently.',
  },
  {
    icon: Globe2,
    title: 'Your currency, our maths',
    body: 'Prices are billed in USD but shown live in your local currency using real exchange rates.',
  },
]

const included = [
  'Plagiarism report included',
  'Free revisions in the policy window',
  'Subject-matched specialist',
  'Direct coordinator updates',
  'Formatting & referencing',
  'Pay 50% to start',
]

export default function Pricing() {
  return (
    <section id="pricing" className="section-y relative overflow-hidden bg-[#fbfaf7]">
      <div className="container-x">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Pricing"
              title="Transparent quotes, in your currency"
              intro="No hidden fees and no surprise add-ons. Build your quote on the right — it updates instantly."
            />

            <div className="mt-10 space-y-5">
              {pricingPoints.map(({ icon: Icon, title, body }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex gap-4"
                >
                  <span className="icon-chip shrink-0">
                    <Icon size={19} strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="text-[16px] font-bold text-ink-950">{title}</h3>
                    <p className="mt-1 max-w-md text-[14.5px] leading-relaxed text-ink-600">{body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 rounded-[22px] bg-ink-950 p-6 sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass-300">Every order includes</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {included.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brass-400/15 text-brass-300">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-[14px] text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:sticky lg:top-24"
          >
            <PriceCalculator />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
