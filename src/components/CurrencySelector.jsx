import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check, Globe } from 'lucide-react'
import { useCurrency } from '../context/CurrencyContext'

export default function CurrencySelector({ variant = 'light', align = 'right' }) {
  const { currencyCode, changeCurrency, allCurrencies } = useCurrency()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const onDark = variant === 'dark' || variant === 'onDark'
  const list = Object.values(allCurrencies)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold transition-colors duration-200 ${
          onDark
            ? 'text-white/75 hover:bg-white/10 hover:text-white'
            : 'text-ink-600 hover:bg-mist-100 hover:text-ink-950'
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select currency"
      >
        <Globe size={14} strokeWidth={1.75} />
        <span className="tabular-nums">{currencyCode}</span>
        <ChevronDown size={13} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute z-50 mt-2 max-h-72 w-56 overflow-y-auto border border-mist-200 bg-white p-1.5 shadow-[0_16px_48px_-12px_rgba(12,22,32,0.22)] ${
              align === 'right' ? 'right-0' : 'left-0'
            }`}
            role="listbox"
          >
            {list.map((c) => {
              const active = c.code === currencyCode
              return (
                <li key={c.code}>
                  <button
                    type="button"
                    onClick={() => {
                      changeCurrency(c.code)
                      setOpen(false)
                    }}
                    className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors ${
                      active ? 'bg-mist-100 text-ink-950' : 'text-ink-600 hover:bg-mist-50'
                    }`}
                    role="option"
                    aria-selected={active}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="w-8 shrink-0 font-mono text-[11px] font-semibold text-brass-600">{c.code}</span>
                      <span className="truncate">{c.name}</span>
                    </span>
                    {active ? (
                      <Check size={14} className="shrink-0 text-ink-950" />
                    ) : (
                      <span className="shrink-0 text-ink-400">{c.symbol}</span>
                    )}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
