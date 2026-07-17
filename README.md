# Assignment Solution — Academic Writing Platform

A production-grade, multi-page academic writing platform for **Assignment Solution**, built with React 19, Vite, Tailwind CSS 4, and Framer Motion. Serves students worldwide (UK, USA, Australia, New Zealand, Canada, Europe, South Korea, Middle East and beyond) with subject-matched writers, transparent pricing in the user's local currency, and a premium, handcrafted UI.

## Tech Stack

- **React 19** — UI framework
- **Vite 8** — Build tooling with instant HMR
- **Tailwind CSS 4** — Utility-first styling
- **Framer Motion** — Animations and scroll reveals
- **React Router 7** — Multi-page client-side routing with lazy loading
- **React Hook Form** — Form handling with validation
- **React Hot Toast** — Notification system
- **Axios** — HTTP client with a mock API interceptor
- **Lucide React** — Icon set
- **React Intersection Observer** — Scroll-triggered animations

## Getting Started

```bash
cd claude_version
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
npm run preview  # preview production build
```

## Routes

| Path | Page |
|------|------|
| `/` | Home (hero, services, process, why-us, features, stats, reviews, live pricing, FAQ, CTA, contact) |
| `/services` | All services grouped by category |
| `/:slug` | Individual service landing page (essay-writing, dissertation-writing, …) |
| `/order-now` | Full order form with a live, currency-aware pricing summary |
| `/contact-us` | Contact form + direct channels |
| `/about-us` | About the studio |
| `/reviews` | Student reviews + rating breakdown |
| `/blogs`, `/blogs/:slug` | Blog listing and articles |
| `/login` | Mock authentication |
| `/sitemap` | Full sitemap |
| `/privacy-policy`, `/terms-and-conditions`, `/revision-policy`, `/refund-policy` | Legal pages |
| `*` | 404 |

## Key Features

- **Live pricing calculator** — base rate in USD, converted and displayed live in the user's local currency.
- **Dynamic currency** — geolocation-based detection (ipapi.co), a manual currency selector, and live exchange rates from the [fawazahmed0/exchange-api](https://github.com/fawazahmed0/exchange-api) with a Cloudflare Pages fallback, a hardcoded fallback, and 6-hour localStorage caching. Payment is always processed in USD; converted amounts are shown for reference.
- **Mock API layer** — Axios interceptor handling `get-fare`, `contact-us`, `order-now`, and `login`.
- **State via React Context** — `AuthContext` (mock auth) and `CurrencyContext`.
- **Premium UI** — editorial hero, mega-menu navigation, floating pill nav, mobile dock, live chat widget, back-to-top, announcement bar, and toasts.
- **SEO** — per-page metadata via a lightweight `Seo` component.
- **Responsive** across mobile, tablet, laptop, and desktop.

## Design System

- **Primary:** Violet (`#8b5cf6` / `#7c3aed`)
- **Neutrals:** Warm paper backgrounds (`#FDFCF9`, `#faf9f7`, `#fffbf0`) over a neutral/surface grayscale
- **Type:** Plus Jakarta Sans (headings) + Inter (body)
- **Motion:** Framer Motion fade/slide/stagger, scroll reveals, animated counters

## Brand

- **Name:** Assignment Solution
- **Tagline:** Clear writing. Confident grades.
- **Audience:** International — students worldwide

## License

MIT
