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
              key={w.name || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.05 * i }}
              className="card card-hover flex flex-col p-6"
            >
              <div className="flex items-center gap-4">
                <img
                  src={writerPhotos[i % writerPhotos.length]}
                  alt=""
                  loading="lazy"
                  className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                />
                <div className="min-w-0">
                  <h3 className="flex items-center gap-1.5 text-[16px] font-bold text-ink-950">
                    {w.name}
                    <BadgeCheck size={16} className="shrink-0 text-brass-500" />
                  </h3>
                  <p className="mt-0.5 text-[12.5px] font-semibold text-brass-600">{(w.focus && w.focus[0]) || 'Specialist'}</p>
                </div>
              </div>
              {w.bio && <p className="mt-4 line-clamp-3 text-[14px] leading-relaxed text-ink-600">{w.bio}</p>}
              {w.focus && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {w.focus.slice(1, 4).map((f) => (
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
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
