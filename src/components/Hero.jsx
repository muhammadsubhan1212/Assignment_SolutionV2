import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, ShieldCheck, Clock, CheckCircle2, FileText } from 'lucide-react'
import { img } from '../data/images'

const ease = [0.16, 1, 0.3, 1]

const avatars = ['ET', 'JW', 'AK', 'SM']

const highlights = [
  { icon: ShieldCheck, label: 'Plagiarism-free' },
  { icon: Clock, label: 'On-time, every time' },
  { icon: CheckCircle2, label: 'Free revisions' },
]

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950">
      {/* Atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 85% 20%, rgba(184,149,106,0.22), transparent 60%), radial-gradient(ellipse 60% 60% at 0% 100%, rgba(77,112,137,0.35), transparent 60%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black, transparent 75%)',
        }}
      />

      <div className="container-x grid items-center gap-12 pb-20 pt-36 sm:pt-40 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:pb-28 lg:pt-44">
        {/* Copy */}
        <div className="min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] py-1.5 pl-1.5 pr-4 text-[12.5px] font-medium text-white/80 backdrop-blur"
          >
            <span className="flex items-center gap-1 rounded-full bg-brass-400 px-2 py-0.5 text-[11px] font-bold text-ink-950">
              <Star size={11} fill="currentColor" /> 4.9
            </span>
            Rated excellent by 50,000+ students
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease }}
            className="mt-6 font-heading text-[clamp(2.4rem,6.2vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white"
          >
            Academic writing that earns the grade you{' '}
            <span className="relative whitespace-nowrap italic text-brass-300">
              studied for
              <svg className="absolute -bottom-2 left-0 w-full text-brass-400/60" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none" aria-hidden>
                <path d="M2 9c60-6 160-8 296-3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/65 sm:text-[17px]"
          >
            Subject-matched specialists, transparent pricing in your own currency, and drafts you can defend with
            confidence — from first-year essays to doctoral chapters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link to="/order-now" className="btn btn-brass btn-lg group">
              Get a free quote
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/services" className="btn btn-ghost-light btn-lg">
              Explore services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:gap-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {avatars.map((a, i) => (
                  <span
                    key={a}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink-950 text-[11px] font-bold text-ink-950"
                    style={{ background: ['#e0ccad', '#c5d3de', '#ccae7f', '#dde3df'][i] }}
                  >
                    {a}
                  </span>
                ))}
              </div>
              <div className="text-[12.5px] leading-tight text-white/60">
                <div className="flex gap-0.5 text-brass-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
                <span className="mt-1 block">Trusted in UK · USA · AU · CA</span>
              </div>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {highlights.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-1.5 text-[13px] font-medium text-white/70">
                  <Icon size={15} className="text-brass-300" /> {label}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="relative mx-auto w-full max-w-[520px] lg:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)] sm:aspect-[5/5] lg:aspect-[4/5]">
            <img src={img.hero} alt={img.heroAlt} className="img-cover ken-burns" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
          </div>

          {/* Floating: delivery card */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
            className="absolute -left-3 bottom-8 w-[230px] rounded-2xl border border-white/60 bg-white/95 p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] backdrop-blur sm:-left-8 sm:w-[260px]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <FileText size={18} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-bold text-ink-950">Dissertation — Ch. 3</p>
                <p className="text-[11.5px] text-ink-500">Delivered 6h before deadline</p>
              </div>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.4, delay: 0.9, ease }}
                className="h-full rounded-full bg-gradient-to-r from-brass-400 to-emerald-500"
              />
            </div>
          </motion.div>

          {/* Floating: grade card */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease }}
            className="absolute -right-2 top-8 rounded-2xl border border-white/10 bg-ink-900/90 px-4 py-3 text-white shadow-2xl backdrop-blur sm:-right-6"
          >
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/50">On-time rate</p>
            <p className="mt-0.5 font-heading text-3xl font-semibold text-brass-300">98%</p>
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  )
}
