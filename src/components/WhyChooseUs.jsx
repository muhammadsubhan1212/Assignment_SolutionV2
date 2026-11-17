import { motion } from 'framer-motion'
import { Users, ShieldCheck, Timer, MessagesSquare, RefreshCw, Star } from 'lucide-react'
import { whyChooseItems } from '../data/home'
import { whyPhotos, img } from '../data/images'
import SectionHeading from './SectionHeading'

const icons = [Users, ShieldCheck, Timer, MessagesSquare, RefreshCw]

export default function WhyChooseUs() {
  const items = whyChooseItems.slice(0, 4)

  return (
    <section className="section-y bg-white">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-2 lg:order-1"
        >
          <div className="grid grid-cols-5 gap-3 sm:gap-4">
            <div className="col-span-3 overflow-hidden rounded-[22px]">
              <img src={whyPhotos[0] || img.studentConsulting} alt="Student working with an academic specialist" loading="lazy" className="aspect-[3/4] img-cover" />
            </div>
            <div className="col-span-2 flex flex-col gap-3 pt-10 sm:gap-4">
              <div className="overflow-hidden rounded-[22px]">
                <img src={whyPhotos[2] || img.editorDocs} alt="" loading="lazy" className="aspect-square img-cover" />
              </div>
              <div className="overflow-hidden rounded-[22px]">
                <img src={img.studentConsulting2} alt="" loading="lazy" className="aspect-[4/5] img-cover" />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 left-4 right-4 mx-auto flex max-w-sm items-center gap-4 rounded-2xl border border-mist-200 bg-white p-4 shadow-[var(--shadow-lift)] sm:left-8 sm:right-auto">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink-950 font-heading text-lg font-semibold text-brass-300">4.9</span>
            <div>
              <div className="flex gap-0.5 text-brass-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>
              <p className="mt-1 text-[13px] font-semibold text-ink-900">Average rating from verified students</p>
            </div>
          </div>
        </motion.div>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Why students choose us"
            title="Built for students who refuse generic help"
            intro="Every engagement is paired, researched and reviewed — so the work arriving in your inbox feels like it belongs to your course."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {items.map((item, i) => {
              const Icon = icons[i]
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: 0.07 * i }}
                  className="rounded-2xl border border-mist-200/80 bg-[#fbfaf7] p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="icon-chip h-10 w-10">
                      <Icon size={18} strokeWidth={1.8} />
                    </span>
                    <span className="text-right">
                      <span className="block font-heading text-xl font-semibold text-ink-950">{item.stat}</span>
                      <span className="block text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">{item.statLabel}</span>
                    </span>
                  </div>
                  <h3 className="mt-4 text-[16px] font-bold text-ink-950">{item.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-600">{item.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
