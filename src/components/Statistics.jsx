import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const stats = [
  { value: 50000, suffix: '+', label: 'Students supported' },
  { value: 98, suffix: '%', label: 'On-time delivery' },
  { value: 4.9, suffix: '/5', label: 'Average rating', decimals: 1 },
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
    <div className="px-2 py-6 text-center sm:py-8">
      <p className="font-heading text-[clamp(2.2rem,4.5vw,3.25rem)] font-semibold tabular-nums leading-none text-ink-950">
        {decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString()}
        <span className="text-brass-500">{suffix}</span>
      </p>
      <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-500">{label}</p>
    </div>
  )
}

export default function Statistics() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section ref={ref} className="bg-white pb-6 pt-2 sm:pb-10">
      <div className="container-x">
        <div className="grid grid-cols-2 divide-mist-200 rounded-[26px] border border-mist-200 bg-gradient-to-b from-brass-50/60 to-white lg:grid-cols-4 lg:divide-x [&>*:nth-child(-n+2)]:border-b [&>*:nth-child(-n+2)]:border-mist-200 lg:[&>*:nth-child(-n+2)]:border-b-0 [&>*:nth-child(odd)]:border-r [&>*:nth-child(odd)]:border-mist-200 lg:[&>*:nth-child(odd)]:border-r-0">
          {stats.map((s) => (
            <Stat key={s.label} {...s} active={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
