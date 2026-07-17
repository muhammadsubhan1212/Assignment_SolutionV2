import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, Sparkles, Clock, FileCheck } from 'lucide-react'

const rotatingWords = ['Essays', 'Theses', 'Research', 'Dissertations', 'Reports']

function RotatingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2400)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline-block relative overflow-hidden align-bottom" style={{ width: '4.5em' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[index]}
          initial={{ y: '100%', opacity: 0, rotateX: -45 }}
          animate={{ y: '0%', opacity: 1, rotateX: 0 }}
          exit={{ y: '-100%', opacity: 0, rotateX: 45 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 bottom-0 text-surface-900 font-heading"
          style={{ fontWeight: 800 }}
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function PaperMockup() {
  const [score, setScore] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0
      const interval = setInterval(() => {
        current += 1
        setScore(current)
        setProgress(current)
        if (current >= 94) clearInterval(interval)
      }, 25)
      return () => clearInterval(interval)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: -5, rotateX: 3 }}
      animate={{ opacity: 1, y: 0, rotateY: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
      style={{ perspective: '1200px' }}
    >
      {/* Main paper card */}
      <div className="relative bg-white rounded-[20px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.04)] p-6 sm:p-8 max-w-md ml-auto overflow-hidden">
        {/* Subtle paper texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        {/* Header */}
        <div className="flex items-center justify-between mb-6 relative">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-medium text-surface-500 uppercase tracking-wider">Live Review</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-surface-400" />
            <span className="text-[11px] text-surface-400">2 min ago</span>
          </div>
        </div>

        {/* Document title area */}
        <div className="mb-6 relative">
          <div className="text-[13px] font-medium text-surface-800 mb-2">
            The Impact of AI on Modern Healthcare Systems
          </div>
          <div className="space-y-1.5">
            <div className="h-[3px] w-full bg-surface-100 rounded-full" />
            <div className="h-[3px] w-[85%] bg-surface-100 rounded-full" />
            <div className="h-[3px] w-[92%] bg-surface-100 rounded-full" />
            <div className="h-[3px] w-[60%] bg-surface-100 rounded-full" />
          </div>
        </div>

        {/* Annotation callouts */}
        <div className="space-y-3 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/80 border border-emerald-100"
          >
            <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <span className="text-[11px] font-semibold text-emerald-800 block">Strong thesis statement</span>
              <span className="text-[10px] text-emerald-600">Clear argument with supporting evidence</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/80 border border-amber-100"
          >
            <Sparkles size={14} className="text-amber-600 mt-0.5 shrink-0" />
            <div>
              <span className="text-[11px] font-semibold text-amber-800 block">Citation enhanced</span>
              <span className="text-[10px] text-amber-600">Added 3 peer-reviewed sources</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/80 border border-blue-100"
          >
            <FileCheck size={14} className="text-blue-600 mt-0.5 shrink-0" />
            <div>
              <span className="text-[11px] font-semibold text-blue-800 block">Formatting verified</span>
              <span className="text-[10px] text-blue-600">APA 7th edition compliance confirmed</span>
            </div>
          </motion.div>
        </div>

        {/* Progress metrics */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3 rounded-xl bg-surface-50 border border-surface-100">
            <span className="text-[10px] font-medium text-surface-400 uppercase tracking-wider block mb-1">Originality</span>
            <div className="flex items-end gap-1">
              <span className="text-xl font-bold text-surface-900 font-heading">{Math.min(progress, 97)}%</span>
            </div>
            <div className="mt-2 h-1 w-full bg-surface-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 97)}%` }}
                transition={{ duration: 2, delay: 0.8, ease: 'easeOut' }}
                className="h-full bg-emerald-500 rounded-full"
              />
            </div>
          </div>
          <div className="p-3 rounded-xl bg-surface-50 border border-surface-100">
            <span className="text-[10px] font-medium text-surface-400 uppercase tracking-wider block mb-1">Readability</span>
            <div className="flex items-end gap-1">
              <span className="text-xl font-bold text-surface-900 font-heading">A+</span>
            </div>
            <div className="mt-2 h-1 w-full bg-surface-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '92%' }}
                transition={{ duration: 2, delay: 1, ease: 'easeOut' }}
                className="h-full bg-blue-500 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Quality score circle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-900">
          <div>
            <span className="text-[10px] font-medium text-surface-400 uppercase tracking-wider block">Quality Score</span>
            <span className="text-2xl font-bold text-white font-heading">{score}/100</span>
          </div>
          <div className="relative w-14 h-14">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="3"
              />
              <motion.path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#34d399"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0, 100' }}
                animate={{ strokeDasharray: `${score}, 100` }}
                transition={{ duration: 2.5, delay: 0.5, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold text-emerald-400">A+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge - offset from main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -left-6 sm:-left-12 bottom-12 px-4 py-2.5 rounded-2xl bg-white shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] border border-surface-100"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
            <Sparkles size={12} className="text-violet-600" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-surface-800 block">Expert Reviewed</span>
            <span className="text-[9px] text-surface-400">PhD-level feedback</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FDFCF9 0%, #FAF8F5 40%, #F5F3EE 100%)'
      }}
    >
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23d4c5a9' fill-opacity='0.08' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`
      }} />

      {/* Subtle diagonal line */}
      <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-surface-200/40 to-transparent" style={{ left: '62%' }} />

      <motion.div style={{ y, opacity }} className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 pt-32 sm:pt-40 lg:pt-44 pb-20">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-start">
            {/* Left: Typography composition */}
            <div className="relative pt-4 lg:pt-8">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-2.5 mb-8"
              >
                <div className="h-[1px] w-8 bg-surface-300" />
                <span className="text-[11px] font-medium text-surface-500 uppercase tracking-[0.2em]">Academic Writing Studio</span>
              </motion.div>

              {/* Main headline - extreme scale, mixed weights */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading leading-[0.9] tracking-[-0.04em] mb-8"
              >
                <span className="block text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] font-extralight text-surface-400">
                  We craft
                </span>
                <span className="block text-[3.5rem] sm:text-[5rem] lg:text-[6rem] xl:text-[7.5rem] font-extrabold text-surface-900 -mt-1 sm:-mt-2">
                  brilliant
                </span>
                <span className="block text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] font-extralight text-surface-400 -mt-1">
                  <RotatingWord />
                </span>
              </motion.h1>

              {/* Subtext - offset from headline */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-[15px] sm:text-base text-surface-500 leading-relaxed max-w-md ml-1"
              >
                Expert writers. Meticulous research. Papers that don't just
                meet the brief — they redefine what's possible in academic work.
              </motion.p>

              {/* CTAs - pushed to unexpected position (left-aligned, offset) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-wrap items-center gap-4 mt-12 ml-1"
              >
                <Link
                  to="/order-now"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-surface-900 text-white text-[14px] font-medium rounded-full hover:bg-surface-800 transition-all duration-300 hover:shadow-xl hover:shadow-surface-900/20 hover:-translate-y-0.5"
                >
                  Start your project
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="#process"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-[14px] font-medium text-surface-600 hover:text-surface-900 transition-colors"
                >
                  See how it works
                </a>
              </motion.div>

              {/* Social proof - minimal, editorial */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-16 ml-1 flex items-center gap-6"
              >
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-[#FDFCF9] bg-surface-200"
                      style={{
                        backgroundColor: ['#e0d4f5', '#d4e5f5', '#d4f5e0', '#f5e0d4'][i]
                      }}
                    />
                  ))}
                </div>
                <div>
                  <span className="text-[13px] font-semibold text-surface-800 block">50,000+ students</span>
                  <span className="text-[11px] text-surface-400">across 120 universities</span>
                </div>
              </motion.div>
            </div>

            {/* Right: Paper review mockup */}
            <div className="relative lg:pt-4">
              <PaperMockup />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAF8F5] to-transparent pointer-events-none" />
    </section>
  )
}
