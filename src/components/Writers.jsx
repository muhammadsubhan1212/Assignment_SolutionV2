import { motion } from 'framer-motion'
import { BadgeCheck, Star } from 'lucide-react'
import { writers } from '../data/home'
import { writerPhotos } from '../data/images'
import SectionHeading from './SectionHeading'

export default function Writers() {
  const list = (writers || []).slice(0, 6)

  return (
    <section className="section-y bg-white">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Meet the desk"
            title="Specialists who live in the literature"
            intro="Researchers, editors and career writers working as one desk — each matched to your subject."
          />
          <p className="flex items-center gap-2 text-[13.5px] font-medium text-ink-600">
            <BadgeCheck size={18} className="text-emerald-600" /> 300+ vetted, degree-holding writers
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {list.map((w, i) => (
            <motion.article
              key={w.role || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.05 * i }}
              className="card card-hover group flex flex-col overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={writerPhotos[i % writerPhotos.length]}
                  alt={w.role}
                  loading="lazy"
                  className="img-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-ink-950 backdrop-blur">
                  <BadgeCheck size={13} className="text-brass-500" /> Verified
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 pt-5">
              <h3 className="font-heading text-[20px] font-semibold text-ink-950">{w.role}</h3>
              {w.bio && <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-ink-600">{w.bio}</p>}
              {w.focus && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {w.focus.map((f) => (
                    <span key={f} className="rounded-full bg-mist-100 px-2.5 py-1 text-[11.5px] font-medium text-ink-700">
                      {f}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-auto flex items-center justify-between border-t border-mist-100 pt-4 text-[12.5px]">
                <span className="flex items-center gap-1 font-semibold text-ink-900">
                  <Star size={13} className="text-brass-500" fill="currentColor" /> {w.rate} satisfaction
                </span>
                <span className="text-ink-500">{w.projects} projects</span>
              </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
