/**
 * Transparent quote model (USD) — priced primarily by word count.
 *
 * Standard academic page ≈ 250 words (double-spaced).
 * total = (deskFee + writing) × urgency
 * writing = (words / 100) × ratePer100 × typeFactor × volumeFactor
 */

export const WORDS_PER_PAGE = 250

const DESK_FEE = 8

/** USD per 100 words by academic level */
const LEVEL_RATE_PER_100 = {
  1: 2.4, // Undergraduate ≈ $6 / page
  2: 3.0, // Master ≈ $7.50 / page
  3: 4.0, // PhD ≈ $10 / page
}

const TYPE_FACTOR = {
  Essay: 1,
  Assignment: 1,
  Other: 1,
  'Book Report': 0.95,
  'Course Work': 1.05,
  'Research Paper': 1.1,
  'Term Paper': 1.1,
  'Thesis Proposal': 1.15,
  'Research Proposal': 1.15,
  'Dissertation Proposal': 1.18,
  Thesis: 1.28,
  Dissertation: 1.38,
}

const URGENCY = {
  1: 1,
  2: 1.04,
  3: 1.1,
  4: 1.14,
  5: 1.18,
  6: 1.26,
  7: 1.34,
  8: 1.48,
  9: 1.62,
  10: 1.82,
  11: 2.05,
}

function volumeFactor(words) {
  if (words >= 6250) return 0.86 // ~25+ pages
  if (words >= 3750) return 0.9 // ~15+ pages
  if (words >= 2000) return 0.95 // ~8+ pages
  return 1
}

function round2(n) {
  return Math.round(n * 100) / 100
}

export function pagesToWords(pages) {
  return Math.max(1, Number(pages) || 1) * WORDS_PER_PAGE
}

export function wordsToPages(words) {
  const w = Math.max(WORDS_PER_PAGE, Number(words) || WORDS_PER_PAGE)
  return round2(w / WORDS_PER_PAGE)
}

/**
 * @param {{ academicLevelId: number, deadlineId: number, words?: number, pages?: number, paperType?: string }} input
 */
export function calcQuote({ academicLevelId, deadlineId, words, pages, paperType = 'Essay' }) {
  const levelId = Number(academicLevelId) || 1
  const deadId = Number(deadlineId) || 1

  let w =
    words != null && words !== ''
      ? Number(words)
      : pagesToWords(pages)

  // Minimum one standard page equivalent
  w = Math.max(WORDS_PER_PAGE, Math.round(w) || WORDS_PER_PAGE)

  const ratePer100 = LEVEL_RATE_PER_100[levelId] ?? LEVEL_RATE_PER_100[1]
  const type = TYPE_FACTOR[paperType] ?? 1
  const volume = volumeFactor(w)
  const urgency = URGENCY[deadId] ?? 1

  const hundreds = w / 100
  const writingGross = round2(hundreds * ratePer100 * type)
  const writing = round2(writingGross * volume)
  const volumeSaved = round2(writingGross - writing)
  const subtotal = round2(DESK_FEE + writing)
  const total = round2(subtotal * urgency)
  const urgencyFee = round2(total - subtotal)

  const pageCount = wordsToPages(w)
  const perPage = round2(total / pageCount)
  const perWord = round2(total / w)
  const per100 = round2((total / w) * 100)

  return {
    total,
    perPage,
    perWord,
    per100,
    deskFee: DESK_FEE,
    writingGross,
    writing,
    volumeSaved,
    urgencyFee,
    urgency,
    ratePer100,
    /** @deprecated use ratePer100 — kept for older UI bindings */
    rate: ratePer100,
    typeFactor: type,
    volumeFactor: volume,
    words: w,
    pages: pageCount,
  }
}

export const PRICING_NOTES = [
  'Priced by word count (250 words ≈ 1 academic page)',
  'Includes specialist matching and editorial QA',
  'Longer briefs get a volume adjustment on writing',
]
