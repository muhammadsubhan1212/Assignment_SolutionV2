export const currencies = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', locale: 'en-GB' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', locale: 'en-AU' },
  NZD: { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', locale: 'en-NZ' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', locale: 'de-DE' },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', locale: 'en-CA' },
  PKR: { code: 'PKR', symbol: 'Rs', name: 'Pakistani Rupee', locale: 'en-PK' },
  KRW: { code: 'KRW', symbol: '₩', name: 'South Korean Won', locale: 'ko-KR' },
  AED: { code: 'AED', symbol: 'AED', name: 'UAE Dirham', locale: 'ar-AE' },
  SAR: { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal', locale: 'ar-SA' },
  MYR: { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', locale: 'ms-MY' },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', locale: 'en-SG' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' },
};

/**
 * Hardcoded fallback rates (USD base) used only when the live API is unreachable.
 */
export const fallbackRates = {
  usd: 1,
  gbp: 0.79,
  aud: 1.44,
  nzd: 1.57,
  eur: 0.92,
  cad: 1.36,
  pkr: 278.5,
  krw: 1320,
  aed: 3.67,
  sar: 3.75,
  myr: 4.47,
  sgd: 1.34,
  inr: 83.5,
};

const RATES_CACHE_KEY = 'as_exchange_rates';
const RATES_CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours

/**
 * Fetch live exchange rates from fawazahmed0/exchange-api (USD base).
 * Uses jsdelivr CDN with Cloudflare Pages as fallback.
 */
export async function fetchLiveRates() {
  const cached = loadCachedRates();
  if (cached) return cached;

  const primary = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json';
  const fallback = 'https://latest.currency-api.pages.dev/v1/currencies/usd.min.json';

  let data = null;
  try {
    const res = await fetch(primary, { signal: AbortSignal.timeout(5000) });
    if (res.ok) data = await res.json();
  } catch { /* primary failed, try fallback */ }

  if (!data) {
    try {
      const res = await fetch(fallback, { signal: AbortSignal.timeout(5000) });
      if (res.ok) data = await res.json();
    } catch { /* fallback failed too */ }
  }

  if (data?.usd) {
    saveCachedRates(data.usd);
    return data.usd;
  }

  return fallbackRates;
}

function loadCachedRates() {
  try {
    const raw = localStorage.getItem(RATES_CACHE_KEY);
    if (!raw) return null;
    const { rates, ts } = JSON.parse(raw);
    if (Date.now() - ts > RATES_CACHE_TTL) return null;
    return rates;
  } catch {
    return null;
  }
}

function saveCachedRates(rates) {
  try {
    localStorage.setItem(RATES_CACHE_KEY, JSON.stringify({ rates, ts: Date.now() }));
  } catch { /* quota exceeded — ignore */ }
}

export const countryToCurrency = {
  US: 'USD',
  GB: 'GBP',
  AU: 'AUD',
  NZ: 'NZD',
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  ES: 'EUR',
  NL: 'EUR',
  IE: 'EUR',
  CA: 'CAD',
  PK: 'PKR',
  KR: 'KRW',
  AE: 'AED',
  SA: 'SAR',
  MY: 'MYR',
  SG: 'SGD',
  IN: 'INR',
};

export const DEFAULT_CURRENCY = 'USD';
