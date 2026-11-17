import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ClipboardList, UserCheck, PenTool, PackageCheck } from 'lucide-react'
import { processSteps } from '../data/home'
import { img } from '../data/images'
import SectionHeading from './SectionHeading'

const icons = [ClipboardList, UserCheck, PenTool, PackageCheck]

export default function HowItWorks() {
  return (
    <section id="process" className="section-y relative overflow-hidden bg-ink-950 text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 45% at 90% 0%, rgba(184,149,106,0.18), transparent 60%)' }}
      />

      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            dark
            eyebrow="How it works"
            title="Four calm steps from brief to confident delivery"
            intro="No guesswork, no chasing. You always know who is working on your paper and when it lands."
          />
          <Link to="/order-now" className="btn btn-brass self-start lg:self-auto">
            Start your brief <ArrowRight size={15} />
          </Link>
        </div>

        <ol className="relative mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <div className="pointer-events-none absolute left-0 right-0 top-[52px] hidden h-px bg-gradient-to-r from-brass-400/0 via-brass-400/40 to-brass-400/0 lg:block" />
          {processSteps.slice(0, 4).map((step, i) => {
            const Icon = icons[i]
            return (
              <motion.li
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-[22px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-colors hover:border-brass-400/40 hover:bg-white/[0.06] sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-brass-400 text-ink-950 shadow-[0_10px_30px_-10px_rgba(184,149,106,0.8)]">
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                  <span className="font-heading text-4xl font-semibold text-white/15">{step.step}</span>
                </div>
                <h3 className="mt-6 font-heading text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{step.body}</p>
                {step.detail && (
                  <p className="mt-5 border-t border-white/10 pt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-brass-300">{step.detail}</p>
                )}
              </motion.li>
            )
          })}
        </ol>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7 }}
          className="relative mt-12 overflow-hidden rounded-[26px] border border-white/10"
        >
          <img src={img.writers} alt="Our editorial desk collaborating" loading="lazy" className="h-56 w-full object-cover sm:h-72 lg:h-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/50 to-transparent" />
          <div className="absolute inset-0 flex items-center p-6 sm:p-10">
            <div className="max-w-md">
              <p className="font-heading text-2xl font-semibold leading-snug text-white sm:text-3xl">
                “Every paper passes through a writer <span className="italic text-brass-300">and</span> an editor before it reaches you.”
              </p>
              <p className="mt-4 text-[13px] font-medium text-white/60">— The Assignment Solution editorial desk</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
