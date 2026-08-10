import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Info } from 'lucide-react'
import { useFare } from '../hooks/useFare'
import { useCurrency } from '../context/CurrencyContext'
import { academicLevels, deadlines, paperTypes, wordOptions, pageOptions } from '../data/orderOptions'
import { PRICING_NOTES, WORDS_PER_PAGE } from '../utils/pricing'

export default function PriceCalculator({ className = '' }) {
  const [paperType, setPaperType] = useState('Essay')
  const [levelId, setLevelId] = useState(1)
  const [unit, setUnit] = useState('words') // 'words' | 'pages'
  const [words, setWords] = useState(1250) // 5 pages
  const [pages, setPages] = useState(5)
  const [deadlineId, setDeadlineId] = useState(1)
  const [showHint, setShowHint] = useState(false)

  const length = unit === 'words' ? words : pages
  const quote = useFare(levelId, deadlineId, length, paperType, unit)
  const { formatPrice, currencyCode } = useCurrency()
  const showUsdNote = currencyCode !== 'USD'

  const fieldClass =
    'w-full appearance-none rounded-lg border border-mist-200 bg-mist-50 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-all duration-200 focus:border-brass-400 focus:ring-2 focus:ring-brass-100 cursor-pointer'

  const switchUnit = (next) => {
    if (next === unit) return
    if (next === 'words') {
      setWords(pages * WORDS_PER_PAGE)
    } else {
      setPages(Math.max(1, Math.round(words / WORDS_PER_PAGE)))
    }
    setUnit(next)
  }

  return (
    <div
      className={`relative overflow-hidden border border-mist-200 bg-white p-6 shadow-[0_24px_64px_-24px_rgba(12,22,32,0.18)] sm:p-7 ${className}`}
    >
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-brass-600">
            Instant estimate
          </span>
          <h3 className="font-heading text-xl font-semibold tracking-tight text-ink-950">Project quote</h3>
          <p className="mt-1 text-[12.5px] leading-relaxed text-ink-500">
            Word-based pricing — pages shown as a guide (250 words ≈ 1 page).
          </p>
        </div>
        <div className="relative shrink-0">
          <button
            type="button"
            className="inline-flex items-center gap-1 border border-mist-200 px-2.5 py-1 text-[11px] font-semibold text-ink-600 transition-colors hover:bg-mist-50"
            onMouseEnter={() => setShowHint(true)}
            onMouseLeave={() => setShowHint(false)}
            onFocus={() => setShowHint(true)}
            onBlur={() => setShowHint(false)}
          >
            <Info size={12} /> Pay in 2
          </button>
          {showHint && (
            <div className="absolute right-0 top-full z-10 mt-2 w-52 border border-mist-100 bg-white p-3 text-[12px] leading-relaxed text-ink-500 shadow-lg">
              Pay 50% to start, and the balance when your draft is ready for review.
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-3.5">
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-ink-700">Paper type</span>
          <select value={paperType} onChange={(e) => setPaperType(e.target.value)} className={fieldClass}>
            {paperTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-ink-700">Academic level</span>
          <select value={levelId} onChange={(e) => setLevelId(Number(e.target.value))} className={fieldClass}>
            {academicLevels.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
        </label>

        <div>
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <span className="text-[13px] font-medium text-ink-700">Length</span>
            <div className="inline-flex border border-mist-200 bg-mist-50 p-0.5 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => switchUnit('words')}
                className={`px-2.5 py-1 transition-colors ${
                  unit === 'words' ? 'bg-ink-950 text-white' : 'text-ink-500 hover:text-ink-900'
                }`}
              >
                Words
              </button>
              <button
                type="button"
                onClick={() => switchUnit('pages')}
                className={`px-2.5 py-1 transition-colors ${
                  unit === 'pages' ? 'bg-ink-950 text-white' : 'text-ink-500 hover:text-ink-900'
                }`}
              >
                Pages
              </button>
            </div>
          </div>

          {unit === 'words' ? (
            <select value={words} onChange={(e) => setWords(Number(e.target.value))} className={fieldClass}>
              {wordOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ) : (
            <select value={pages} onChange={(e) => setPages(Number(e.target.value))} className={fieldClass}>
              {pageOptions.slice(0, 80).map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          )}
        </div>

        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-ink-700">Deadline</span>
          <select value={deadlineId} onChange={(e) => setDeadlineId(Number(e.target.value))} className={fieldClass}>
            {deadlines.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 space-y-2 border border-mist-200 bg-mist-50 px-4 py-4 text-[13px]">
        <div className="flex justify-between gap-3 text-ink-600">
          <span>
            Writing · {quote.words.toLocaleString()} words
            <span className="text-ink-400"> · {formatPrice(quote.ratePer100)}/100 words</span>
          </span>
          <span className="tabular-nums font-medium text-ink-900">{formatPrice(quote.writingGross)}</span>
        </div>
        {quote.volumeSaved > 0 && (
          <div className="flex justify-between gap-3 text-ink-600">
            <span>Volume adjustment</span>
            <span className="tabular-nums font-medium text-emerald-700">−{formatPrice(quote.volumeSaved)}</span>
          </div>
        )}
        <div className="flex justify-between gap-3 text-ink-600">
          <span>Desk matching &amp; QA</span>
          <span className="tabular-nums font-medium text-ink-900">{formatPrice(quote.deskFee)}</span>
        </div>
        {quote.urgencyFee > 0 && (
          <div className="flex justify-between gap-3 text-ink-600">
            <span>Urgency</span>
            <span className="tabular-nums font-medium text-ink-900">+{formatPrice(quote.urgencyFee)}</span>
          </div>
        )}
        <div className="flex items-baseline justify-between gap-3 border-t border-mist-200 pt-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">Estimated total</p>
            <p className="mt-0.5 text-[11px] text-ink-400">
              ≈ {quote.pages} page{quote.pages !== 1 ? 's' : ''} · {formatPrice(quote.per100)}/100 words
            </p>
          </div>
          <motion.span
            key={quote.total}
            initial={{ opacity: 0.4, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="font-heading text-2xl font-semibold tabular-nums text-ink-950"
          >
            {formatPrice(quote.total)}
          </motion.span>
        </div>
      </div>

      <ul className="mt-3 space-y-1">
        {PRICING_NOTES.map((note) => (
          <li key={note} className="text-[11.5px] leading-snug text-ink-400">
            · {note}
          </li>
        ))}
      </ul>

      {showUsdNote && (
        <p className="mt-2.5 text-[11px] leading-relaxed text-ink-400">
          ≈ ${quote.total.toFixed(2)} USD total · payment processed in USD.
        </p>
      )}

      <Link
        to="/order-now"
        className="group mt-5 inline-flex w-full items-center justify-center gap-2 bg-ink-950 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ink-800"
      >
        Continue to order
        <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    </div>
  )
}
