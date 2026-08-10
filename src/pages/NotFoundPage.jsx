import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you requested does not exist on Assignment Solution." />
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-mist-50 px-5 py-20 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass-600">404</p>
        <h1 className="mt-3 font-heading text-5xl font-semibold tracking-tight text-ink-950 sm:text-6xl">Page not found</h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-600">
          That route isn&apos;t part of Assignment Solution. Head home or browse services to continue.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-lg bg-ink-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink-800">
            Go home
          </Link>
          <Link to="/services" className="rounded-lg border border-mist-300 px-6 py-3 text-sm font-medium text-ink-800 transition-colors hover:border-brass-500 hover:text-ink-950">
            View services
          </Link>
        </div>
      </section>
    </>
  )
}
