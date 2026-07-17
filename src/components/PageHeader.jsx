import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function PageHeader({ eyebrow, title, subtitle, crumbs = [], align = 'left' }) {
  const centered = align === 'center'

  return (
    <section
      className="relative overflow-hidden border-b border-surface-200/70"
      style={{ background: 'linear-gradient(180deg, #FDFCF9 0%, #FAF8F5 60%, #F5F3EE 100%)' }}
    >
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23d4c5a9' fill-opacity='0.08' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 pt-32 pb-14 sm:pt-36 sm:pb-16">
        <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}>
          {/* Breadcrumbs */}
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex items-center gap-1.5 text-[12px] font-medium text-surface-400 ${centered ? 'justify-center' : ''}`}
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-surface-700 transition-colors">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight size={12} className="text-surface-300" />
                {c.path ? (
                  <Link to={c.path} className="hover:text-surface-700 transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-surface-600">{c.label}</span>
                )}
              </span>
            ))}
          </motion.nav>

          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className={`mt-6 flex items-center gap-2.5 ${centered ? 'justify-center' : ''}`}
            >
              <span className="h-px w-8 bg-surface-300" />
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-surface-500">{eyebrow}</span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-surface-900"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`mt-5 text-base sm:text-lg leading-relaxed text-surface-500 ${centered ? 'mx-auto max-w-xl' : 'max-w-xl'}`}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}
