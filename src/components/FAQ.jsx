import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { faqs as faqData } from '../data/home'

const faqs = faqData.map((f) => ({ question: f.q, answer: f.a }))

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section
      id="faq"
      className="py-28 sm:py-36 relative overflow-hidden"
      style={{
        background: `
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 20px,
            rgba(0, 0, 0, 0.015) 20px,
            rgba(0, 0, 0, 0.015) 21px
          ),
          #ffffff
        `,
      }}
    >
      <div ref={ref} className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left column — heading + decorative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 relative"
          >
            {/* Decorative question mark */}
            <div
              className="absolute -top-8 -left-4 text-[200px] font-serif font-bold leading-none select-none pointer-events-none"
              style={{ color: 'rgba(0, 0, 0, 0.04)' }}
              aria-hidden="true"
            >
              ?
            </div>

            <div className="relative">
              <p className="text-sm font-medium text-neutral-500 mb-3 tracking-wide uppercase">
                FAQ
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
                Questions we hear often
              </h2>
              <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                Can't find what you're looking for? Our team is happy to help with anything specific.
              </p>
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 border-b border-neutral-900 pb-0.5 hover:border-neutral-400 hover:text-neutral-600 transition-colors duration-200"
              >
                Reach out to us
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-px"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Right column — accordion */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
                    className="relative"
                  >
                    {/* Left accent border */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[2px] transition-colors duration-300"
                      style={{ backgroundColor: isOpen ? '#171717' : 'transparent' }}
                    />

                    <button
                      onClick={() => toggle(index)}
                      className="w-full text-left py-5 pl-5 pr-4 flex items-center justify-between gap-4 group cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span
                        className={`text-[15px] transition-all duration-200 ${
                          isOpen
                            ? 'font-semibold text-neutral-900'
                            : 'font-medium text-neutral-600 group-hover:text-neutral-900'
                        }`}
                      >
                        {faq.question}
                      </span>

                      {/* Plus icon that rotates to X */}
                      <span
                        className="shrink-0 w-6 h-6 flex items-center justify-center text-neutral-400 transition-transform duration-300"
                        style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        >
                          <line x1="7" y1="0" x2="7" y2="14" />
                          <line x1="0" y1="7" x2="14" y2="7" />
                        </svg>
                      </span>
                    </button>

                    {/* Answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pl-5 pr-8 pb-6">
                            <p className="text-sm text-neutral-500 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
