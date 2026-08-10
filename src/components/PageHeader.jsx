import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { img } from '../data/images'

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  crumbs = [],
  align = 'left',
  image = img.workspace,
}) {
  const centered = align === 'center'

  return (
    <section className="relative isolate overflow-hidden bg-ink-950">
      <img src={image} alt="" className="absolute inset-0 img-cover opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/88 to-ink-950/55" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-mist-50 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8">
        <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}>
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex items-center gap-1.5 text-[12px] font-medium text-white/50 ${centered ? 'justify-center' : ''}`}
            aria-label="Breadcrumb"
          >
            <Link to="/" className="transition-colors hover:text-white">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight size={12} className="text-white/30" />
                {c.path ? (
                  <Link to={c.path} className="transition-colors hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/75">{c.label}</span>
                )}
              </span>
            ))}
          </motion.nav>

          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className={`mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-brass-300 ${centered ? 'text-center' : ''}`}
            >
              {eyebrow}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-heading text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.5rem]"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`mt-5 text-base leading-relaxed text-white/65 sm:text-lg ${centered ? 'mx-auto max-w-xl' : 'max-w-xl'}`}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}
