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
      <img src={image} alt="" className="absolute inset-0 img-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/88 to-ink-950/55" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 70% at 100% 0%, rgba(184,149,106,0.22), transparent 60%)' }} />

      <div className="container-x relative pb-14 pt-36 sm:pb-20 sm:pt-44">
        <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}>
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex flex-wrap items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[12px] font-medium text-white/55 backdrop-blur ${centered ? 'justify-center' : ''}`}
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
              className={`eyebrow eyebrow-light mt-7 ${centered ? 'justify-center' : ''}`}
            >
              {eyebrow}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-heading text-[clamp(2.25rem,5.5vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white text-balance"
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
