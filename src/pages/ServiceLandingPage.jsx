import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo'
import PriceCalculator from '../components/PriceCalculator'
import Accordion from '../components/Accordion'
import OrderCTA from '../components/OrderCTA'
import { whyChooseItems } from '../data/home'
import { getServiceBySlug, allServiceEntries } from '../data/servicesContent'
import { img, servicePhotos } from '../data/images'

export default function ServiceLandingPage() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) {
    return (
      <section className="mx-auto max-w-6xl px-5 py-32 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-wider text-brass-600">Not found</p>
        <h1 className="mt-2 font-heading text-3xl font-extrabold text-ink-950">This service doesn&apos;t exist</h1>
        <div className="mt-7 flex justify-center gap-3">
          <Link to="/services" className="rounded-lg bg-ink-950 px-6 py-3 text-sm font-medium text-white hover:bg-ink-800">
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
      <section className="border-b border-mist-200">
        <div className="grid lg:grid-cols-2">
          <div className="relative overflow-hidden bg-ink-950">
            <img
              src={img.studentWriting}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-950/90 to-ink-900/70" />
            <div className="relative px-5 pb-14 pt-32 sm:px-8 sm:pt-36 md:px-10 lg:pb-16 xl:pl-10">
              <p className="mb-4 text-[12px] font-medium text-white/45">
                <Link to="/services" className="hover:text-white">
                  Services
                </Link>
                <span className="mx-2 text-white/25">/</span>
                <span className="text-white/75">{service.title}</span>
              </p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[16ch] font-heading text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-white md:text-[2.6rem]"
              >
                {service.hero}
              </motion.h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/60">{service.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/order-now"
                  className="inline-flex items-center rounded-lg bg-brass-400 px-6 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-brass-300"
                >
                  Start this service
                </Link>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Ask a question
                </Link>
              </div>
            </div>
          </div>
          <div className="relative bg-mist-50">
            <div className="px-5 pb-14 pt-14 sm:px-8 md:px-10 lg:pt-32 xl:pr-10">
              <div className="mx-auto w-full max-w-md lg:mx-0">
                <PriceCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">
          Built for {service.title.toLowerCase()}
        </h2>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-600">
          What students notice first when they work with us on this brief type.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {service.benefits.map((b) => (
            <div key={b} className="flex gap-3 border border-mist-200 bg-mist-50/60 p-6">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-brass-600" />
              <span className="text-sm leading-relaxed text-ink-700">{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why students stay */}
      <section className="border-y border-mist-200 bg-mist-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center font-heading text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">
            Why students stay with the desk
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseItems.slice(0, 3).map((item) => (
              <div key={item.title} className="border border-mist-200 bg-white p-6">
                <div className="mb-3 flex items-baseline gap-2">
                  <span className="font-heading text-2xl font-bold text-ink-950">{item.stat}</span>
                  <span className="text-[11px] text-ink-500">{item.statLabel}</span>
                </div>
                <h3 className="font-heading text-base font-semibold text-ink-950">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{item.body}</p>
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
              <h2 className="mb-6 font-heading text-xl font-semibold tracking-tight text-ink-950">Related services</h2>
              <div className="space-y-3">
                {related.map((r, i) => {
                  const photo = servicePhotos[i % servicePhotos.length]
                  return (
                    <Link
                      key={r.slug}
                      to={`/${r.slug}`}
                      className="group flex items-center gap-4 border border-mist-200 bg-white p-3 pr-5 transition-all hover:border-mist-300 hover:bg-mist-50"
                    >
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-ink-900">
                        <img src={photo.src} alt="" loading="lazy" className="img-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-ink-950">{r.title}</h3>
                        <p className="mt-0.5 line-clamp-1 text-[13px] text-ink-600">{r.hero}</p>
                      </div>
                      <ArrowUpRight size={16} className="shrink-0 text-ink-300 transition-colors group-hover:text-brass-600" />
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
          <div>
            <h2 className="mb-4 font-heading text-xl font-semibold tracking-tight text-ink-950">Questions about this service</h2>
            <Accordion items={service.faqs} />
          </div>
        </div>
      </section>

      <OrderCTA title={`Start your ${service.title.toLowerCase()} brief`} />
    </>
  )
}
