import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function AIDashboardMockup() {
  const writers = [
    { name: 'Dr. Sarah K.', field: 'Computer Science', score: 98, x: 70, y: 20 },
    { name: 'Prof. James L.', field: 'Mathematics', score: 95, x: 85, y: 45 },
    { name: 'Dr. Amina R.', field: 'Biology', score: 97, x: 75, y: 70 },
    { name: 'Dr. Wei C.', field: 'Physics', score: 94, x: 60, y: 55 },
  ]

  const nodes = [
    { x: 15, y: 30 }, { x: 25, y: 50 }, { x: 20, y: 70 },
    { x: 35, y: 25 }, { x: 30, y: 60 }, { x: 40, y: 45 },
    { x: 10, y: 55 }, { x: 28, y: 38 },
  ]

  return (
    <div className="relative w-full h-64 sm:h-80 mt-6 overflow-hidden rounded-lg bg-neutral-950/50 border border-neutral-800/60">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }} />

      {/* Center algorithm node */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center z-10"
      >
        <div className="w-6 h-6 rounded-full bg-indigo-500 animate-pulse" />
      </motion.div>

      {/* Floating data nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.06 }}
          viewport={{ once: true }}
          className="absolute w-2 h-2 rounded-full bg-indigo-400/60"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        />
      ))}

      {/* Connection lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        {nodes.map((node, i) => (
          <motion.line
            key={i}
            x1={`${node.x}%`}
            y1={`${node.y}%`}
            x2="45%"
            y2="50%"
            stroke="#6366f1"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.6 + i * 0.05 }}
            viewport={{ once: true }}
          />
        ))}
        {writers.map((writer, i) => (
          <motion.line
            key={`w-${i}`}
            x1="45%"
            y1="50%"
            x2={`${writer.x}%`}
            y2={`${writer.y}%`}
            stroke="#a5b4fc"
            strokeWidth="1"
            strokeOpacity="0.5"
            strokeDasharray="4 3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
            viewport={{ once: true }}
          />
        ))}
      </svg>

      {/* Writer profile cards */}
      {writers.map((writer, i) => (
        <motion.div
          key={writer.name}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 + i * 0.12 }}
          viewport={{ once: true }}
          className="absolute bg-neutral-900/90 backdrop-blur-sm border border-neutral-700/50 rounded-md px-2.5 py-1.5 z-10"
          style={{ left: `${writer.x}%`, top: `${writer.y}%` }}
        >
          <p className="text-[10px] font-medium text-white leading-none">{writer.name}</p>
          <p className="text-[9px] text-neutral-400 mt-0.5">{writer.field}</p>
          <div className="flex items-center gap-1 mt-1">
            <div className="w-full h-0.5 rounded-full bg-neutral-700 overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${writer.score}%` }} />
            </div>
            <span className="text-[8px] text-emerald-400 font-mono">{writer.score}%</span>
          </div>
        </motion.div>
      ))}

      {/* Label */}
      <div className="absolute bottom-3 left-3 text-[10px] text-neutral-500 font-mono uppercase tracking-wider">
        AI Match Engine v3.2
      </div>
    </div>
  )
}

export default function Features() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section header — editorial style, left-aligned */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-xs font-semibold text-indigo-600 tracking-widest uppercase">
            How it works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mt-3 leading-[1.1]">
            Engineered for
            <br />
            academic excellence.
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Hero card — spans 2 cols, dark background, 24px radius */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2 p-8 sm:p-10 bg-neutral-950 text-white relative overflow-hidden"
            style={{ borderRadius: '24px' }}
          >
            {/* Ambient glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Core Technology
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
                AI-Powered Writer Matching
              </h3>
              <p className="text-neutral-400 mt-3 max-w-xl text-sm sm:text-base leading-relaxed">
                Our algorithm analyzes subject matter, complexity, deadline constraints, and writing style preferences to pair you with the ideal specialist from our vetted pool of 300+ academics.
              </p>
              <AIDashboardMockup />
            </div>
          </motion.div>

          {/* Medium card 1 — white with thick left border, sharp corners (0px radius) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="p-7 sm:p-8 bg-white border border-neutral-200 border-l-4 border-l-indigo-600 relative min-h-[220px]"
            style={{ borderRadius: '0px' }}
          >
            <h3 className="text-xl font-bold text-neutral-900">Express Delivery</h3>
            <p className="text-sm text-neutral-500 mt-3 leading-relaxed">
              Rush orders completed in as little as 6 hours. No quality compromise — every express order passes the same three-tier review.
            </p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-5xl font-bold text-neutral-900 font-mono">6h</span>
              <span className="text-xs text-neutral-400 uppercase tracking-wider">fastest turnaround</span>
            </div>
            {/* Speed indicator bars */}
            <div className="absolute bottom-6 right-6 flex items-end gap-1 opacity-40">
              {[12, 20, 32, 28, 40, 36, 44].map((h, i) => (
                <div key={i} className="w-1.5 rounded-full bg-indigo-300" style={{ height: `${h}px` }} />
              ))}
            </div>
          </motion.div>

          {/* Medium card 2 — subtle dot pattern, 8px radius, taller */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="p-7 sm:p-8 bg-neutral-50 relative overflow-hidden min-h-[260px]"
            style={{ borderRadius: '8px' }}
          >
            {/* Dot pattern background */}
            <div className="absolute inset-0 opacity-[0.35]" style={{
              backgroundImage: `radial-gradient(circle, #d4d4d4 1px, transparent 1px)`,
              backgroundSize: '16px 16px',
            }} />

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-neutral-900">Three-Tier Quality Assurance</h3>
              <p className="text-sm text-neutral-500 mt-3 leading-relaxed">
                Every deliverable passes through writer, senior editor, and quality specialist before reaching you.
              </p>

              {/* QA Pipeline mockup */}
              <div className="mt-8 flex items-center gap-3">
                {['Draft', 'Edit', 'QA'].map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${
                        i === 2
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                          : 'bg-white border border-neutral-200 text-neutral-700 shadow-sm'
                      }`}>
                        {i + 1}
                      </div>
                      <span className="text-[10px] text-neutral-500 mt-1.5 font-medium">{step}</span>
                    </div>
                    {i < 2 && (
                      <div className="w-8 h-px bg-neutral-300 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-neutral-300 rotate-45" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Simulated checks */}
              <div className="mt-6 space-y-2">
                {['Plagiarism scan passed', 'Citation format verified', 'Rubric alignment checked'].map((check, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-neutral-600">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 flex items-center justify-center">
                      <svg className="w-2 h-2 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {check}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Full-width banner card — short, solid dark accent */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="md:col-span-2 px-8 py-5 bg-gradient-to-r from-indigo-600 to-indigo-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ borderRadius: '12px' }}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl sm:text-4xl font-bold text-white font-mono">A-</span>
              <div>
                <p className="text-white font-semibold text-sm">Minimum Grade Guaranteed</p>
                <p className="text-indigo-100/70 text-xs mt-0.5">or full refund — we put our reputation on the line</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-white/80 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-300" />
                <span>6 Languages</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-300" />
                <span>40+ Disciplines</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-300" />
                <span>24/7 Available</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
