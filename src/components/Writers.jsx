import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { writers } from '../data/home'
import { writerPhotos, img } from '../data/images'

export default function Writers() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const list = (writers || []).slice(0, 6)

  return (
    <section ref={ref} className="bg-mist-100/60 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass-600">Our desk</p>
            <h2 className="mt-3 font-heading text-[clamp(2rem,4vw,3.25rem)] font-semibold text-ink-950">
              Specialists who live in the literature
            </h2>
          </div>
          <p className="max-w-sm text-[14.5px] leading-relaxed text-ink-600">
            A collaborative editorial culture — researchers, editors, and career writers working as one desk.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mt-12 relative aspect-[21/9] overflow-hidden"
        >
          <img src={img.writers} alt="Writers collaborating around a conference table" loading="lazy" className="img-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent" />
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((w, i) => (
            <motion.div
              key={w.name || i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.05 * i }}
              className="group overflow-hidden bg-white"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <img
                  src={writerPhotos[i % writerPhotos.length]}
                  alt=""
                  loading="lazy"
                  className="img-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold text-ink-950">{w.name}</h3>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-brass-600">
                  {(w.focus && w.focus[0]) || 'Specialist'}
                </p>
                {w.bio && (
                  <p className="mt-3 line-clamp-3 text-[13.5px] leading-relaxed text-ink-600">{w.bio}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
