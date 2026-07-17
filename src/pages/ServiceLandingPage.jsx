import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo'
import PriceCalculator from '../components/PriceCalculator'
import Accordion from '../components/Accordion'
import OrderCTA from '../components/OrderCTA'
import { whyChooseItems } from '../data/home'
import { getServiceBySlug, allServiceEntries } from '../data/servicesContent'

export default function ServiceLandingPage() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) {
    return (
      <section className="mx-auto max-w-6xl px-5 py-32 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-wider text-violet-600">Not found</p>
        <h1 className="mt-2 font-heading text-3xl font-extrabold text-neutral-900">This service doesn&apos;t exist</h1>
        <div className="mt-7 flex justify-center gap-3">
          <Link to="/services" className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800">
            Browse services
          </Link>
        </div>
      </section>
    )
  }

  const related = allServiceEntries
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3)

  return (
    <>
      <Seo title={service.seoTitle} description={service.seoDescription} path={`/${service.slug}`} />

      {/* Split hero: dark editorial left + calculator right */}
      <section className="border-b border-neutral-100">
        <div className="grid lg:grid-cols-2">
          <div className="relative overflow-hidden bg-neutral-900">
            <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-violet-600/20 blur-[100px]" />
            <div className="relative px-5 pb-14 pt-32 sm:px-8 sm:pt-36 md:px-10 lg:pb-16 xl:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]">
              <p className="mb-4 text-[12px] font-medium text-neutral-500">
                <Link to="/services" className="hover:text-white">
                  Services
                </Link>
                <span className="mx-2 text-neutral-700">/</span>
                <span className="text-neutral-300">{service.title}</span>
              </p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[16ch] font-heading text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-white md:text-[2.6rem]"
              >
                {service.hero}
              </motion.h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-neutral-400">{service.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/order-now"
                  className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
                >
                  Start this service
                </Link>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Ask a question
                </Link>
              </div>
            </div>
          </div>
          <div className="relative bg-[#FAF8F5]">
            <div className="px-5 pb-14 pt-14 sm:px-8 md:px-10 lg:pt-32 xl:pr-[max(2rem,calc((100vw-72rem)/2+2rem))]">
              <div className="mx-auto w-full max-w-md lg:mx-0">
                <PriceCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          Built for {service.title.toLowerCase()}
        </h2>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-neutral-500">
          What students notice first when they work with us on this brief type.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {service.benefits.map((b) => (
            <div key={b} className="flex gap-3 rounded-2xl border border-neutral-200/80 bg-white p-6">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <span className="text-sm leading-relaxed text-neutral-600">{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why students stay */}
      <section className="border-y border-neutral-100 bg-[#faf9f7] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Why students stay with the desk
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseItems.slice(0, 3).map((item) => (
              <div key={item.title} className="rounded-2xl border border-neutral-200/70 bg-white p-6">
                <div className="mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-2xl font-bold text-neutral-900">{item.stat}</span>
                  <span className="text-[11px] text-neutral-400">{item.statLabel}</span>
                </div>
                <h3 className="text-base font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related + FAQ */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {related.length > 0 && (
            <div>
              <h2 className="mb-6 text-xl font-bold tracking-tight text-neutral-900">Related services</h2>
              <div className="space-y-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/${r.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-neutral-200/80 bg-white p-5 transition-all hover:border-neutral-300 hover:shadow-sm"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900">{r.title}</h3>
                      <p className="mt-0.5 line-clamp-1 text-[13px] text-neutral-500">{r.hero}</p>
                    </div>
                    <ArrowUpRight size={16} className="shrink-0 text-neutral-300 transition-colors group-hover:text-neutral-900" />
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-neutral-900">Questions about this service</h2>
            <Accordion items={service.faqs} />
          </div>
        </div>
      </section>

      <OrderCTA title={`Start your ${service.title.toLowerCase()} brief`} />
    </>
  )
}
