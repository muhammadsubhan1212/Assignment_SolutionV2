import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Accordion({ items, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen)

  return (
    <div className="divide-y divide-neutral-100">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const question = item.q ?? item.question
        const answer = item.a ?? item.answer
        return (
          <div key={index} className="relative">
            <div
              className="absolute bottom-0 left-0 top-0 w-[2px] transition-colors duration-300"
              style={{ backgroundColor: isOpen ? '#171717' : 'transparent' }}
            />
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="group flex w-full items-center justify-between gap-4 py-5 pl-5 pr-4 text-left"
              aria-expanded={isOpen}
            >
              <span
                className={`text-[15px] transition-all duration-200 ${
                  isOpen ? 'font-semibold text-neutral-900' : 'font-medium text-neutral-600 group-hover:text-neutral-900'
                }`}
              >
                {question}
              </span>
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center text-neutral-400 transition-transform duration-300"
                style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="7" y1="0" x2="7" y2="14" />
                  <line x1="0" y1="7" x2="14" y2="7" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pl-5 pr-8">
                    <p className="text-sm leading-relaxed text-neutral-500">{answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
