import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Info, Sparkles } from 'lucide-react'
import { Select } from './Field'
import { useFare } from '../hooks/useFare'
import { useCurrency } from '../context/CurrencyContext'
import { academicLevels, deadlines, pageOptions, paperTypes } from '../data/orderOptions'

export default function PriceCalculator({ className = '' }) {
  const [paperType, setPaperType] = useState(paperTypes[0])
  const [levelId, setLevelId] = useState(1)
  const [pages, setPages] = useState(1)
  const [deadlineId, setDeadlineId] = useState(1)
  const [showHint, setShowHint] = useState(false)

  const { perPage, total, loading } = useFare(levelId, deadlineId, pages)
  const { formatPrice, currencyCode } = useCurrency()
  const showUsdNote = currencyCode !== 'USD'

  const fieldClass =
    'w-full appearance-none rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-800 outline-none transition-all duration-200 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 cursor-pointer'

  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border border-neutral-200/80 bg-white p-6 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.16),0_0_0_1px_rgba(0,0,0,0.02)] sm:p-7 ${className}`}
    >
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-600">
            <Sparkles size={12} /> Instant estimate
          </span>
          <h3 className="font-heading text-xl font-bold tracking-tight text-neutral-900">Calculate your price</h3>
        </div>
        <div className="relative shrink-0">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-2.5 py-1 text-[11px] font-semibold text-neutral-600 transition-colors hover:bg-neutral-50"
            onMouseEnter={() => setShowHint(true)}
            onMouseLeave={() => setShowHint(false)}
            onFocus={() => setShowHint(true)}
            onBlur={() => setShowHint(false)}
          >
            <Info size={12} /> Pay in 2
          </button>
          {showHint && (
            <div className="absolute right-0 top-full z-10 mt-2 w-52 rounded-xl border border-neutral-100 bg-white p-3 text-[12px] leading-relaxed text-neutral-500 shadow-lg">
              Pay 50% to start, and the balance when your draft is ready for review.
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-3.5">
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-neutral-700">Paper type</span>
          <select value={paperType} onChange={(e) => setPaperType(e.target.value)} className={fieldClass}>
            {paperTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-neutral-700">Academic level</span>
          <select value={levelId} onChange={(e) => setLevelId(Number(e.target.value))} className={fieldClass}>
            {academicLevels.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3.5">
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-neutral-700">Length</span>
            <select value={pages} onChange={(e) => setPages(Number(e.target.value))} className={fieldClass}>
              {pageOptions.slice(0, 60).map((p) => (
                <option key={p.value} value={p.value}>
                  {p.value} pg
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-neutral-700">Deadline</span>
            <select value={deadlineId} onChange={(e) => setDeadlineId(Number(e.target.value))} className={fieldClass}>
              {deadlines.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Result */}
      <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200">
        <div className="bg-neutral-50 p-4">
          <p className="text-[11px] uppercase tracking-wide text-neutral-400">Per page</p>
          <p className="mt-1 font-heading text-lg font-bold tabular-nums tracking-tight text-neutral-900">
            {loading ? '—' : formatPrice(perPage)}
          </p>
        </div>
        <div className="bg-neutral-900 p-4">
          <p className="text-[11px] uppercase tracking-wide text-neutral-400">Total</p>
          <motion.p
            key={loading ? 'l' : total}
            initial={{ opacity: 0.4, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-1 font-heading text-lg font-bold tabular-nums tracking-tight text-white"
          >
            {loading ? '—' : formatPrice(total)}
          </motion.p>
        </div>
      </div>

      {showUsdNote && !loading && (
        <p className="mt-2.5 text-[11px] leading-relaxed text-neutral-400">
          ≈ ${total.toFixed(2)} USD total · payment processed in USD.
        </p>
      )}

      <Link
        to="/order-now"
        className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-neutral-800"
      >
        Continue to order
        <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    </div>
  )
}
