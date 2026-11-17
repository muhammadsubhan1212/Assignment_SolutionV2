import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight, FileSearch, PenLine, GraduationCap, BookOpen, Briefcase, Megaphone } from 'lucide-react'
import { premiumServices } from '../data/home'
import { servicePhotos, img } from '../data/images'
import SectionHeading from './SectionHeading'

const icons = [FileSearch, PenLine, GraduationCap, BookOpen, Briefcase, Megaphone]

export default function Services() {
  const [lead, ...rest] = premiumServices.slice(0, 6)

  return (
    <section id="services" className="section-y relative bg-[#fbfaf7]">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="Writing support across every academic frontier"
            intro="From first-year essays to doctoral chapters — specialists who know the discipline, not just the template."
          />
          <Link to="/services" className="btn btn-outline shrink-0 self-start lg:self-auto">
            All 20+ services <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-5">
          {/* Featured card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="sm:col-span-2 lg:col-span-1 lg:row-span-2"
          >
            <Link
              to={lead.path}
              className="group relative flex h-full min-h-[340px] flex-col justify-end overflow-hidden rounded-[22px] bg-ink-950 p-7"
            >
              <img src={img.studentWriting} alt={servicePhotos[0].alt} loading="lazy" className="absolute inset-0 img-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/10" />
              <div className="relative">
                <span className="inline-flex rounded-full bg-brass-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-950">Most requested</span>
                <h3 className="mt-4 font-heading text-3xl font-semibold text-white">{lead.title}</h3>
                <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-white/70">{lead.body}</p>
                {lead.tags && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {lead.tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/20 px-3 py-1 text-[11.5px] font-medium text-white/80">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brass-300">
                  Explore <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </motion.div>

          {rest.map((service, i) => {
            const Icon = icons[(i + 1) % icons.length]
            return (
              <motion.div
                key={service.path}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: 0.06 * (i + 1), ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={service.path} className="card card-hover group flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between">
                    <span className="icon-chip">
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-mist-200 text-ink-400 transition-all group-hover:border-ink-950 group-hover:bg-ink-950 group-hover:text-white">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-[22px] font-semibold text-ink-950">{service.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-600">{service.body}</p>
                  {service.tags && (
                    <p className="mt-auto pt-5 text-[12px] font-medium text-ink-400">{service.tags.join(' · ')}</p>
                  )}
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
