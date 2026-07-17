import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const testimonials = [
  {
    quote: "I was drowning in coursework after a family emergency. Assignment Solution didn't just deliver the work — they matched me with a writer who genuinely understood my research area. The final dissertation chapter was better than anything I could have written under those circumstances.",
    author: 'Sarah M.',
    role: 'MSc Psychology, UCL',
    initials: 'SM',
  },
  {
    quote: "Skeptical at first, but the quality blew me away. My statistics assignment came back with detailed explanations for every step. Went from a C student to getting A's consistently.",
    author: 'James K.',
    role: 'BSc Economics, Manchester',
    initials: 'JK',
  },
  {
    quote: "Used them for my entire final year. Every single paper was delivered ahead of schedule. My supervisor specifically praised the quality of my literature reviews.",
    author: 'David L.',
    role: 'LLB Law, Edinburgh',
    initials: 'DL',
  },
]

const filmstripTestimonials = [
  {
    quote: 'The revision process is what sold me. They proactively improved sections I hadn\'t even flagged.',
    author: 'Priya R.',
    role: 'MBA, Warwick',
    initials: 'PR',
  },
  {
    quote: 'Their programming help saved my degree. Clean code, full documentation, and they explained the logic.',
    author: 'Aisha T.',
    role: 'BEng CS, Imperial',
    initials: 'AT',
  },
  {
    quote: 'Delivered ahead of schedule every time. My supervisor noticed the improvement immediately.',
    author: 'David L.',
    role: 'LLB Law, Edinburgh',
    initials: 'DL',
  },
  {
    quote: 'From struggling to firsts. The writer understood exactly what my professor expected.',
    author: 'Megan H.',
    role: 'BA English, Bristol',
    initials: 'MH',
  },
  {
    quote: 'Bank-grade confidentiality and PhD-level quality. Genuinely changed my academic trajectory.',
    author: 'Ravi P.',
    role: 'MSc Finance, LSE',
    initials: 'RP',
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" className="relative py-28 sm:py-36 bg-white overflow-hidden">
      {/* Top horizontal rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-neutral-200" />

      {/* 4.9 rating badge */}
      <div className="absolute top-8 right-8 sm:top-12 sm:right-12 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-900 rounded-full shadow-xl"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 0L10.12 5.26L16 6.11L11.78 10.04L12.82 16L8 13.27L3.18 16L4.22 10.04L0 6.11L5.88 5.26L8 0Z" fill="#FBBF24" />
          </svg>
          <span className="text-sm font-semibold text-white">4.9</span>
          <span className="text-xs text-neutral-400">/ 5.0</span>
        </motion.div>
      </div>

      <div ref={ref} className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Magazine pull-quote area */}
        <div className="relative mb-20 sm:mb-28">
          {/* Oversized quotation mark background */}
          <div
            className="absolute -top-16 -left-4 sm:-top-20 sm:-left-8 text-[300px] sm:text-[400px] font-serif leading-none select-none pointer-events-none"
            style={{ color: '#f0f0f0' }}
            aria-hidden="true"
          >
            &ldquo;
          </div>

          {/* Rotating quote */}
          <div className="relative z-10 max-w-[70vw] sm:max-w-[65vw] min-h-[200px] sm:min-h-[260px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-serif italic text-neutral-800 leading-snug tracking-tight">
                  {testimonials[activeIndex].quote}
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center">
                    <span className="text-sm font-semibold text-white">
                      {testimonials[activeIndex].initials}
                    </span>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-neutral-900">
                      {testimonials[activeIndex].author}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress indicators */}
          <div className="absolute bottom-0 right-0 sm:right-8 flex items-center gap-2 z-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === activeIndex
                    ? 'w-8 h-2 bg-neutral-900'
                    : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Filmstrip row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <div className="border-t border-neutral-100 pt-10">
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {filmstripTestimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex-none w-[280px] sm:w-[320px] snap-start"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
                      <span className="text-xs font-semibold text-neutral-600">
                        {t.initials}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-800">{t.author}</p>
                      <p className="text-xs text-neutral-400">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  {/* Rating dots instead of stars */}
                  <div className="flex gap-1 mt-3">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span
                        key={idx}
                        className="w-1.5 h-1.5 rounded-full bg-neutral-800"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
