import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, intro, align = 'left', dark = false, className = '', children }) {
  const centered = align === 'center'
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}
    >
      {eyebrow && <p className={`eyebrow ${dark ? 'eyebrow-light' : ''} ${centered ? 'justify-center' : ''}`}>{eyebrow}</p>}
      <h2 className={`h-display mt-4 ${dark ? 'text-white' : 'text-ink-950'}`}>{title}</h2>
      {intro && (
        <p className={`mt-5 text-[16px] leading-relaxed ${dark ? 'text-white/60' : 'text-ink-600'} ${centered ? 'mx-auto max-w-xl' : 'max-w-xl'}`}>
          {intro}
        </p>
      )}
      {children}
    </motion.div>
  )
}
