import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { whyChooseItems } from '../data/home'
import { whyPhotos, img } from '../data/images'

export default function WhyChooseUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="bg-mist-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass-600">Why us</p>
            <h2 className="mt-3 font-heading text-[clamp(2rem,4vw,3.25rem)] font-semibold text-ink-950">
              Built for students who refuse generic help
            </h2>
            <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-ink-600">
              Every engagement is paired, researched, and reviewed — so the work arriving in your inbox feels like it belongs to your course.
            </p>

            <div className="mt-10 space-y-8">
              {whyChooseItems.slice(0, 5).map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.08 * i }}
                  className="border-l-2 border-brass-400 pl-5"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-heading text-xl font-semibold text-ink-950">{item.title}</h3>
                    <span className="text-[12px] font-bold uppercase tracking-wider text-brass-600">
                      {item.stat} {item.statLabel}
                    </span>
                  </div>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-600">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="grid grid-cols-2 gap-3 self-start"
          >
            <div className="space-y-3 pt-8">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={whyPhotos[0]} alt="" loading="lazy" className="img-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden">
                <img src={whyPhotos[1]} alt="" loading="lazy" className="img-cover" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="relative aspect-square overflow-hidden">
                <img src={whyPhotos[2]} alt="" loading="lazy" className="img-cover" />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={whyPhotos[3]} alt="" loading="lazy" className="img-cover" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={img.studentConsulting2} alt="" loading="lazy" className="img-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
