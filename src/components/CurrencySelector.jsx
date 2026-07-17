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

  const dark = variant === 'dark'
  const list = Object.values(allCurrencies)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors duration-200 ${
          dark
            ? 'text-neutral-300 hover:text-white hover:bg-white/10'
            : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
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
            className={`absolute z-50 mt-2 max-h-72 w-56 overflow-y-auto rounded-2xl border border-neutral-100 bg-white p-1.5 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.18)] ${
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
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                      active ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                    role="option"
                    aria-selected={active}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="w-8 shrink-0 font-mono text-[11px] font-semibold text-neutral-500">{c.code}</span>
                      <span className="truncate">{c.name}</span>
                    </span>
                    {active ? (
                      <Check size={14} className="shrink-0 text-neutral-900" />
                    ) : (
                      <span className="shrink-0 text-neutral-400">{c.symbol}</span>
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
