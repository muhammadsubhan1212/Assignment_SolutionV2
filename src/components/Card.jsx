import { motion } from 'framer-motion'

const cardVariants = {
  default: 'bg-white border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/50',
  elevated: 'bg-white shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50',
  glass: 'bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg',
  dark: 'bg-slate-900 border border-slate-800 text-white',
  gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/25',
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
      className={`rounded-2xl transition-all duration-300 ${padding} ${cardVariants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
