import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, MessageCircle } from 'lucide-react'
import { faqs as faqData } from '../data/home'
import { brand } from '../data/brand'
import SectionHeading from './SectionHeading'

const faqs = faqData.map((f) => ({ question: f.q, answer: f.a }))

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="section-y bg-white">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="FAQ" title="Questions we hear often" intro="Everything you need to know before you place an order." />
          <div className="mt-8 rounded-[22px] border border-mist-200 bg-[#fbfaf7] p-6">
            <p className="text-[15px] font-bold text-ink-950">Still have a question?</p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-ink-600">Our desk replies in minutes, day or night.</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-ink btn-sm">
                <MessageCircle size={15} /> WhatsApp us
              </a>
              <Link to="/contact-us" className="btn btn-outline btn-sm">
                Send a message
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-colors ${open ? 'border-brass-200 bg-brass-50/50' : 'border-mist-200 bg-white hover:border-mist-300'}`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  aria-expanded={open}
                >
                  <span className="text-[15.5px] font-bold text-ink-950 sm:text-[16.5px]">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${open ? 'bg-ink-950 text-white' : 'bg-mist-100 text-ink-700'}`}
                  >
                    <Plus size={16} />
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
                      <p className="px-5 pb-5 pr-14 text-[14.5px] leading-relaxed text-ink-600 sm:px-6">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
