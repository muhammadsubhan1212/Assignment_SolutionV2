import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { processSteps } from '../data/home'
import { processPhotos } from '../data/images'

export default function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="process" ref={ref} className="relative overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 10%, rgba(184,149,106,0.18), transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass-300">How it works</p>
          <h2 className="mt-3 font-heading text-[clamp(2rem,4vw,3.25rem)] font-semibold text-white">
            Four calm steps from brief to confident delivery
          </h2>
        </div>

        <div className="mt-16 space-y-16 lg:space-y-24">
          {processSteps.slice(0, 4).map((step, i) => {
            const photo = processPhotos[i % processPhotos.length]
            const reverse = i % 2 === 1
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img src={photo.src} alt={photo.alt} loading="lazy" className="img-cover" />
                </div>
                <div>
                  <span className="font-heading text-5xl font-semibold text-brass-400/80">{step.step}</span>
                  <h3 className="mt-3 font-heading text-2xl font-semibold text-white sm:text-3xl">{step.title}</h3>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/65">{step.body}</p>
                  {step.detail && (
                    <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.16em] text-brass-300">
                      {step.detail}
                    </p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
