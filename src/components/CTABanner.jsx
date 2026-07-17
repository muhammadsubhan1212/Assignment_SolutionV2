import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'

function FloatingPlus({ x, y, delay }) {
  return (
    <motion.span
      className="absolute text-neutral-700 text-sm font-light select-none pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      +
    </motion.span>
  )
}

const plusPositions = [
  { x: 8, y: 15, delay: 0 },
  { x: 92, y: 20, delay: 1.2 },
  { x: 15, y: 75, delay: 2.4 },
  { x: 85, y: 80, delay: 0.8 },
  { x: 50, y: 10, delay: 3.0 },
  { x: 30, y: 85, delay: 1.8 },
  { x: 72, y: 12, delay: 2.0 },
  { x: 5, y: 45, delay: 3.5 },
  { x: 95, y: 55, delay: 0.4 },
]

export default function CTABanner() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      ref={ref}
      className="relative bg-[#0a0a0a] py-32 sm:py-40 overflow-hidden"
    >
      {plusPositions.map((pos, i) => (
        <FloatingPlus key={i} x={pos.x} y={pos.y} delay={pos.delay} />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(48px,8vw,80px)] leading-[1.05] tracking-tight text-white font-light"
        >
          Ready to get your{' '}
          <span className="font-serif italic font-normal">A</span>?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <Link
            to="/order-now"
            className="inline-block px-10 py-4 border border-white text-white text-sm tracking-wide uppercase font-medium transition-all duration-300 hover:bg-white hover:text-black"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
