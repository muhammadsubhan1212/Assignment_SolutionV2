import { useMemo } from 'react'
import { calcQuote } from '../utils/pricing'

/**
 * Instant client-side quote — word-based (pages optional).
 * Pass either `words` or `pages` (pages convert at 250 words each).
 */
export function useFare(academicLevelId, deadlineId, length, paperType = 'Essay', lengthUnit = 'pages') {
  const quote = useMemo(() => {
    const input = {
      academicLevelId,
      deadlineId,
      paperType,
    }
    if (lengthUnit === 'words') input.words = length
    else input.pages = length
    return calcQuote(input)
  }, [academicLevelId, deadlineId, length, paperType, lengthUnit])

  return {
    ...quote,
    perPage: quote.perPage,
    total: quote.total,
    loading: false,
    error: null,
  }
}
