import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { img } from '../data/images'

const stats = [
  { value: 50000, suffix: '+', label: 'Students supported' },
  { value: 98, suffix: '%', label: 'On-time delivery' },
  { value: 4.9, suffix: '', label: 'Average rating', decimals: 1 },
  { value: 120, suffix: '+', label: 'Universities reached' },
]

function useCountUp(target, active, decimals = 0) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return undefined
    let frame
    const start = performance.now()
    const duration = 1400
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - (1 - p) ** 3
      setN(Number((target * eased).toFixed(decimals)))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, target, decimals])
  return n
}

function Stat({ value, suffix, label, decimals = 0, active }) {
  const n = useCountUp(value, active, decimals)
  return (
    <div>
      <p className="font-heading text-4xl font-semibold text-white sm:text-5xl">
        {decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 text-[13px] font-medium uppercase tracking-[0.14em] text-white/55">{label}</p>
    </div>
  )
}

export default function Statistics() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 })

  return (
    <section ref={ref} className="relative isolate overflow-hidden py-24 sm:py-28">
      <img src={img.library} alt="" className="absolute inset-0 img-cover" loading="lazy" />
      <div className="absolute inset-0 bg-ink-950/82" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <Stat key={s.label} {...s} active={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
