import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

function AnimatedNumber({ value, suffix = '', prefix = '', decimals = 0 }) {
  const [display, setDisplay] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(decimals > 0 ? +(eased * value).toFixed(decimals) : Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, decimals])

  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? display.toFixed(decimals) : display.toLocaleString()}{suffix}
    </span>
  )
}

const stats = [
  { value: 15847, suffix: '', label: 'Projects delivered', prefix: '' },
  { value: 4.9, suffix: '', label: 'Average rating', prefix: '', decimals: 1 },
  { value: 98, suffix: '%', label: 'On-time delivery', prefix: '' },
  { value: 312, suffix: '+', label: 'Expert writers', prefix: '' },
]

export default function Statistics() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section ref={ref} className="relative py-24 sm:py-32 bg-surface-950 overflow-hidden">
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Headline stat — focal point */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="text-xs font-medium text-neutral-500 tracking-[0.2em] uppercase mb-6">
            By the numbers
          </p>
          <div className="text-[clamp(4rem,12vw,8rem)] font-bold font-mono text-white leading-none tracking-tighter">
            <AnimatedNumber value={15847} />
          </div>
          <p className="text-neutral-400 text-base mt-4">
            projects delivered and counting
          </p>
        </motion.div>

        {/* Supporting stats — horizontal grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-neutral-800/50 rounded-2xl overflow-hidden border border-neutral-800/80">
          {stats.slice(1).map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="bg-surface-950 p-8 sm:p-10 text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight mb-2">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  decimals={stat.decimals || 0}
                />
              </div>
              <p className="text-sm text-neutral-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
