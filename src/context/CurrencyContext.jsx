import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { currencies, fallbackRates, fetchLiveRates, countryToCurrency, DEFAULT_CURRENCY } from '../data/currencies';

const STORAGE_KEY = 'as_currency';

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [currencyCode, setCurrencyCode] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_CURRENCY;
    return localStorage.getItem(STORAGE_KEY) || null;
  });
  const [detected, setDetected] = useState(false);
  const [rates, setRates] = useState(fallbackRates);
  const ratesFetched = useRef(false);

  // Fetch live exchange rates on mount
  useEffect(() => {
    if (ratesFetched.current) return;
    ratesFetched.current = true;
    fetchLiveRates().then((liveRates) => {
      if (liveRates) setRates(liveRates);
    });
  }, []);

  // Detect user's country for currency auto-selection
  useEffect(() => {
    if (currencyCode) {
      setDetected(true);
      return;
    }
    async function detect() {
      try {
        const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) });
        if (!res.ok) throw new Error('Geo lookup failed');
        const data = await res.json();
        const code = countryToCurrency[data.country_code] || DEFAULT_CURRENCY;
        setCurrencyCode(code);
        localStorage.setItem(STORAGE_KEY, code);
      } catch {
        setCurrencyCode(DEFAULT_CURRENCY);
      } finally {
        setDetected(true);
      }
    }
    detect();
  }, [currencyCode]);

  const changeCurrency = useCallback((code) => {
    setCurrencyCode(code);
    localStorage.setItem(STORAGE_KEY, code);
  }, []);

  const convert = useCallback(
    (amountUSD) => {
      const code = (currencyCode || DEFAULT_CURRENCY).toLowerCase();
      const rate = rates[code] || 1;
      return Math.round(amountUSD * rate);
    },
    [currencyCode, rates],
  );

  const formatPrice = useCallback(
    (amountUSD) => {
      const code = currencyCode || DEFAULT_CURRENCY;
      const codeLower = code.toLowerCase();
      const info = currencies[code] || currencies.USD;
      const rate = rates[codeLower] || 1;
      const converted = Math.round(amountUSD * rate);

      if (code === 'KRW' || code === 'PKR' || code === 'INR') {
        return `${info.symbol} ${converted.toLocaleString(info.locale)}`;
      }
      return new Intl.NumberFormat(info.locale, {
        style: 'currency',
        currency: code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(converted);
    },
    [currencyCode, rates],
  );

  const value = useMemo(
    () => ({
      currencyCode: currencyCode || DEFAULT_CURRENCY,
      currency: currencies[currencyCode || DEFAULT_CURRENCY] || currencies.USD,
      detected,
      changeCurrency,
      convert,
      formatPrice,
      allCurrencies: currencies,
      rates,
    }),
    [currencyCode, detected, changeCurrency, convert, formatPrice, rates],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
}
