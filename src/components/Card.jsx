import { motion } from 'framer-motion'

const cardVariants = {
  default: 'bg-white border border-mist-200 hover:border-mist-300',
  elevated: 'bg-white border border-mist-200 shadow-lg shadow-ink-950/5',
  glass: 'bg-white/70 backdrop-blur-xl border border-white/40',
  dark: 'bg-ink-950 border border-ink-800 text-white',
  gradient: 'bg-ink-950 text-white shadow-xl shadow-ink-950/20',
}

export default function Card({
  children,
  variant = 'default',
  className = '',
  hover = true,
  padding = 'p-6',
  ...props
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.3 } } : {}}
      className={`rounded-lg transition-all duration-300 ${padding} ${cardVariants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
