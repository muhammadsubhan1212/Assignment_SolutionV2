import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you requested does not exist on Assignment Solution." />
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-[#fbfaf7] px-5 pb-20 pt-40 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass-600">404</p>
        <h1 className="mt-3 font-heading text-5xl font-semibold tracking-tight text-ink-950 sm:text-6xl">Page not found</h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-600">
          That route isn&apos;t part of Assignment Solution. Head home or browse services to continue.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-ink">
            Go home
          </Link>
          <Link to="/services" className="btn btn-outline">
            View services
          </Link>
        </div>
      </section>
    </>
  )
}
