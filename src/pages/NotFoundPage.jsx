import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you requested does not exist on Assignment Solution." />
      <section
        className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-5 py-20 text-center"
        style={{ background: 'linear-gradient(180deg, #FDFCF9 0%, #F5F3EE 100%)' }}
      >
        <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-violet-600">404</p>
        <h1 className="mt-3 font-heading text-5xl font-extrabold tracking-tight text-neutral-900 sm:text-6xl">Page not found</h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-500">
          That route isn&apos;t part of Assignment Solution. Head home or browse services to continue.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
            Go home
          </Link>
          <Link to="/services" className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400">
            View services
          </Link>
        </div>
      </section>
    </>
  )
}
