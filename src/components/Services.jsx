import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight } from 'lucide-react'
import { premiumServices } from '../data/home'
import { servicePhotos } from '../data/images'

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const featured = premiumServices.slice(0, 6)

  return (
    <section ref={ref} id="services" className="relative bg-mist-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass-600">Services</p>
          <h2 className="mt-3 font-heading text-[clamp(2rem,4vw,3.25rem)] font-semibold text-ink-950">
            Writing support across every academic frontier
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">
            From first-year essays to doctoral chapters — specialists who know the discipline, not just the template.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, i) => {
            const photo = servicePhotos[i % servicePhotos.length]
            return (
              <motion.div
                key={service.path}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={service.path} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink-900">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="img-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <div className="flex items-end justify-between gap-3">
                        <h3 className="font-heading text-xl font-semibold text-white">{service.title}</h3>
                        <ArrowUpRight className="mb-1 shrink-0 text-brass-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={18} />
                      </div>
                      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-white/70">{service.body}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-ink-900 underline decoration-brass-400 decoration-2 underline-offset-6 transition-colors hover:text-ink-700"
          >
            View all services
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
