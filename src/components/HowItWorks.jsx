import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const steps = [
  {
    number: '01',
    title: 'Share your brief',
    description: 'Upload requirements, guidelines, and reference materials. Set your deadline and academic level.',
    detail: 'Average briefing time: 3 minutes',
  },
  {
    number: '02',
    title: 'We match an expert',
    description: 'Our system pairs you with a verified specialist who holds credentials in your exact field.',
    detail: 'Matching happens within 15 minutes',
  },
  {
    number: '03',
    title: 'Track live progress',
    description: 'Monitor milestones, message your writer directly, and review drafts as work progresses.',
    detail: 'Real-time dashboard access',
  },
  {
    number: '04',
    title: 'Review & approve',
    description: "Receive your polished work with plagiarism report. Request revisions until it's perfect.",
    detail: 'Free unlimited revisions included',
  },
]

// Mini UI Mockup Components
function BriefFormMockup() {
  return (
    <div className="w-full max-w-[220px] rounded-xl border border-neutral-200 bg-white shadow-lg shadow-neutral-100/80 overflow-hidden">
      <div className="px-3 py-2 border-b border-neutral-100 bg-neutral-50">
        <div className="text-[9px] font-semibold text-neutral-500 uppercase tracking-wide">New Order</div>
      </div>
      <div className="p-3 space-y-2.5">
        <div>
          <div className="text-[8px] text-neutral-400 mb-1 font-medium">Subject Area</div>
          <div className="h-5 rounded bg-indigo-50 border border-indigo-100 flex items-center px-2">
            <span className="text-[8px] text-indigo-700">Psychology</span>
          </div>
        </div>
        <div>
          <div className="text-[8px] text-neutral-400 mb-1 font-medium">Deadline</div>
          <div className="h-5 rounded bg-neutral-50 border border-neutral-200 flex items-center px-2">
            <span className="text-[8px] text-neutral-600">Dec 15, 2025</span>
          </div>
        </div>
        <div>
          <div className="text-[8px] text-neutral-400 mb-1 font-medium">Pages</div>
          <div className="flex gap-1">
            {[5, 10, 15].map((n) => (
              <div key={n} className={`h-5 w-8 rounded text-[8px] flex items-center justify-center font-medium ${n === 10 ? 'bg-indigo-600 text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                {n}
              </div>
            ))}
          </div>
        </div>
        <div className="h-6 rounded-md bg-indigo-600 flex items-center justify-center mt-1">
          <span className="text-[8px] text-white font-semibold">Submit Brief</span>
        </div>
      </div>
    </div>
  )
}

function WriterMatchMockup() {
  return (
    <div className="relative w-full max-w-[220px] h-[140px]">
      {/* Background card */}
      <div className="absolute top-2 left-6 w-[140px] rounded-xl border border-neutral-200 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
            <span className="text-[7px] font-bold text-violet-600">MK</span>
          </div>
          <div>
            <div className="text-[8px] font-semibold text-neutral-700">Dr. M. Khan</div>
            <div className="text-[7px] text-neutral-400">Psychology PhD</div>
          </div>
        </div>
        <div className="flex gap-0.5">
          {[1,2,3,4,5].map((s) => (
            <div key={s} className="w-2 h-2 rounded-full bg-amber-400" />
          ))}
        </div>
      </div>
      {/* Foreground card — offset */}
      <div className="absolute top-10 left-0 w-[140px] rounded-xl border border-indigo-200 bg-indigo-50 p-3 shadow-md z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-indigo-200 flex items-center justify-center">
            <span className="text-[7px] font-bold text-indigo-700">SL</span>
          </div>
          <div>
            <div className="text-[8px] font-semibold text-indigo-900">Dr. S. Lewis</div>
            <div className="text-[7px] text-indigo-600">98% match</div>
          </div>
        </div>
        <div className="text-[7px] text-indigo-500 font-medium">Best match for your brief</div>
      </div>
      {/* Third card peek */}
      <div className="absolute top-0 right-2 w-[100px] rounded-lg border border-neutral-100 bg-neutral-50 p-2 opacity-50">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-emerald-100" />
          <div className="text-[7px] text-neutral-400">Dr. R. Patel</div>
        </div>
      </div>
    </div>
  )
}

function TrackedChangesMockup() {
  return (
    <div className="w-full max-w-[220px] rounded-xl border border-neutral-200 bg-white shadow-lg shadow-neutral-100/80 overflow-hidden">
      <div className="px-3 py-2 border-b border-neutral-100 flex items-center justify-between">
        <div className="text-[9px] font-semibold text-neutral-500">Draft v3</div>
        <div className="flex gap-1">
          <div className="w-4 h-4 rounded bg-green-100 flex items-center justify-center">
            <span className="text-[7px] text-green-600">+</span>
          </div>
          <div className="w-4 h-4 rounded bg-red-100 flex items-center justify-center">
            <span className="text-[7px] text-red-600">-</span>
          </div>
        </div>
      </div>
      <div className="p-3 space-y-1.5">
        <div className="h-1.5 bg-neutral-200 rounded-full w-full" />
        <div className="h-1.5 bg-neutral-200 rounded-full w-4/5" />
        <div className="h-1.5 bg-green-200 rounded-full w-full border-l-2 border-green-500" />
        <div className="h-1.5 bg-green-200 rounded-full w-3/4 border-l-2 border-green-500" />
        <div className="h-1.5 bg-neutral-200 rounded-full w-full" />
        <div className="h-1.5 bg-red-100 rounded-full w-5/6 line-through border-l-2 border-red-400" />
        <div className="h-1.5 bg-neutral-200 rounded-full w-full" />
        <div className="h-1.5 bg-neutral-200 rounded-full w-2/3" />
      </div>
      {/* Annotation bubble */}
      <div className="mx-3 mb-3 p-2 rounded-lg bg-amber-50 border border-amber-200">
        <div className="text-[8px] font-semibold text-amber-700 mb-0.5">Revision note</div>
        <div className="text-[7px] text-amber-600 leading-tight">Added supporting evidence from Smith (2024) as requested.</div>
      </div>
    </div>
  )
}

function DeliveryMockup() {
  return (
    <div className="w-full max-w-[220px] rounded-xl border border-neutral-200 bg-white shadow-lg shadow-neutral-100/80 overflow-hidden">
      <div className="p-4 flex flex-col items-center text-center">
        {/* Animated checkmark circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
          className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3"
        >
          <motion.svg
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="w-6 h-6 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            />
          </motion.svg>
        </motion.div>
        <div className="text-[10px] font-semibold text-neutral-900 mb-1">Delivered Successfully</div>
        <div className="text-[8px] text-neutral-500 mb-3">Your paper is ready for download</div>
        <div className="w-full space-y-1.5">
          <div className="flex items-center justify-between px-2 py-1.5 rounded bg-neutral-50">
            <span className="text-[8px] text-neutral-600">Plagiarism Score</span>
            <span className="text-[8px] font-bold text-emerald-600">2%</span>
          </div>
          <div className="flex items-center justify-between px-2 py-1.5 rounded bg-neutral-50">
            <span className="text-[8px] text-neutral-600">Word Count</span>
            <span className="text-[8px] font-bold text-neutral-800">3,450</span>
          </div>
          <div className="flex items-center justify-between px-2 py-1.5 rounded bg-neutral-50">
            <span className="text-[8px] text-neutral-600">Format</span>
            <span className="text-[8px] font-bold text-neutral-800">APA 7th</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const mockups = [BriefFormMockup, WriterMatchMockup, TrackedChangesMockup, DeliveryMockup]

export default function HowItWorks() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section ref={ref} id="process" className="py-28 sm:py-40 relative overflow-hidden bg-[#faf9f7]">
      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section title — rotated on desktop, offset left */}
        <div className="flex items-start gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="hidden lg:flex flex-col items-center shrink-0 sticky top-32"
          >
            <span className="text-xs font-semibold text-neutral-400 tracking-[0.2em] uppercase [writing-mode:vertical-lr] rotate-180">
              How it works
            </span>
            <div className="w-px h-24 bg-neutral-300 mt-4" />
          </motion.div>

          {/* Main content area */}
          <div className="flex-1">
            {/* Mobile header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="lg:hidden mb-16"
            >
              <span className="text-xs font-semibold text-neutral-400 tracking-[0.2em] uppercase block mb-4">
                How it works
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
                From brief to brilliance.
              </h2>
            </motion.div>

            {/* Desktop header — large, editorial */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="hidden lg:block mb-24"
            >
              <h2 className="text-5xl xl:text-6xl font-bold text-neutral-900 leading-[1.1]">
                From brief
                <br />
                <span className="text-neutral-300 italic font-light">to brilliance.</span>
              </h2>
              <p className="text-neutral-500 mt-6 max-w-md text-base leading-relaxed">
                A streamlined process designed around academic deadlines. No complexity, no friction.
              </p>
            </motion.div>

            {/* Steps — diagonal zigzag layout */}
            <div className="relative space-y-0">
              {steps.map((step, i) => {
                const isEven = i % 2 === 0
                const Mockup = mockups[i]

                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 50, x: isEven ? -30 : 30 }}
                    animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
                    className={`relative flex flex-col sm:flex-row items-start gap-6 sm:gap-10 py-10 sm:py-14 ${
                      isEven ? 'sm:mr-auto sm:pr-8' : 'sm:ml-auto sm:pl-8'
                    } ${i > 0 ? '-mt-4 sm:-mt-6' : ''}`}
                    style={{ zIndex: 10 + i }}
                  >
                    {/* Oversized background number */}
                    <span
                      className={`absolute top-0 text-[100px] sm:text-[120px] font-bold leading-none select-none pointer-events-none text-neutral-200/60 ${
                        isEven ? '-left-4 sm:-left-8' : '-right-4 sm:-right-8'
                      }`}
                    >
                      {step.number}
                    </span>

                    {/* Content card */}
                    <div
                      className={`relative z-10 flex flex-col sm:flex-row items-start gap-6 sm:gap-8 w-full sm:max-w-2xl ${
                        isEven ? '' : 'sm:flex-row-reverse'
                      }`}
                    >
                      {/* Text content */}
                      <div className={`flex-1 min-w-0 ${isEven ? '' : 'sm:text-right'}`}>
                        <div className={`flex items-center gap-3 mb-3 ${isEven ? '' : 'sm:justify-end'}`}>
                          <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white">{step.number}</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">{step.title}</h3>
                        </div>
                        <p className="text-sm sm:text-base text-neutral-500 leading-relaxed mb-3 max-w-sm">
                          {step.description}
                        </p>
                        <span className="inline-block text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
                          {step.detail}
                        </span>
                      </div>

                      {/* Mockup visual */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                        className="shrink-0"
                      >
                        <Mockup />
                      </motion.div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Bottom stat callout */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1 }}
              className="mt-16 sm:mt-24 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-sm"
            >
              <div>
                <p className="text-xs font-semibold text-neutral-400 tracking-wide uppercase mb-1">Average turnaround</p>
                <p className="text-3xl sm:text-4xl font-bold text-neutral-900">48 hours</p>
              </div>
              <div className="w-px h-10 bg-neutral-200 hidden sm:block" />
              <div>
                <p className="text-xs font-semibold text-neutral-400 tracking-wide uppercase mb-1">Rush delivery</p>
                <p className="text-3xl sm:text-4xl font-bold text-indigo-600">6 hours</p>
              </div>
              <div className="w-px h-10 bg-neutral-200 hidden sm:block" />
              <div>
                <p className="text-xs font-semibold text-neutral-400 tracking-wide uppercase mb-1">Satisfaction</p>
                <p className="text-3xl sm:text-4xl font-bold text-emerald-600">99.2%</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
