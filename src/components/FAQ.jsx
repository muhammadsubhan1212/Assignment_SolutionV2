import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Plus } from 'lucide-react'
import { faqs as faqData } from '../data/home'
import { img } from '../data/images'

const faqs = faqData.map((f) => ({ question: f.q, answer: f.a }))

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="faq" ref={ref} className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={img.studentPlanning} alt="Student planning a study schedule" loading="lazy" className="img-cover" />
            </div>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-brass-600">FAQ</p>
            <h2 className="mt-3 font-heading text-[clamp(2rem,3.5vw,2.75rem)] font-semibold text-ink-950">
              Questions we hear often
            </h2>
            <p className="mt-4 text-[14.5px] leading-relaxed text-ink-600">
              Still unsure?{' '}
              <Link to="/contact-us" className="font-semibold text-ink-950 underline decoration-brass-400 underline-offset-4">
                Talk to the desk
              </Link>
              .
            </p>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-mist-200 border-y border-mist-200">
              {faqs.map((faq, index) => {
                const open = openIndex === index
                return (
                  <div key={faq.question}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? -1 : index)}
                      className="flex w-full items-start justify-between gap-4 py-5 text-left"
                      aria-expanded={open}
                    >
                      <span className="font-heading text-lg font-semibold text-ink-950 sm:text-xl">
                        {faq.question}
                      </span>
                      <motion.span
                        animate={{ rotate: open ? 45 : 0 }}
                        className="mt-1 shrink-0 text-brass-600"
                      >
                        <Plus size={18} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-5 pr-8 text-[14.5px] leading-relaxed text-ink-600">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
