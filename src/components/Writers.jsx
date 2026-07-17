import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { getInitials } from '../utils/helpers'
import { writers } from '../data/home'

const avatarTints = ['#ede9fe', '#dbeafe', '#dcfce7', '#fef3c7', '#fee2e2', '#e0e7ff']
const avatarInk = ['#7c3aed', '#2563eb', '#16a34a', '#d97706', '#dc2626', '#4f46e5']

export default function Writers() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} className="bg-[#faf9f7] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 sm:mb-16"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">The people behind the work</p>
          <h2 className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Writers matched to
            <br />
            <span className="font-light italic text-neutral-300">your discipline.</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {writers.map((w, i) => (
            <motion.article
              key={w.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 + 0.1 }}
              className="group flex flex-col rounded-2xl border border-neutral-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(0,0,0,0.12)]"
            >
              <div className="flex items-center gap-3.5">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style={{ backgroundColor: avatarTints[i % avatarTints.length], color: avatarInk[i % avatarInk.length] }}
                >
                  {getInitials(w.name)}
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-neutral-900">{w.name}</h3>
                  <p className="text-[12px] text-neutral-400">{w.focus[0]} specialist</p>
                </div>
              </div>

              <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-neutral-500">{w.bio}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {w.focus.slice(0, 3).map((f) => (
                  <span key={f} className="rounded-md bg-neutral-100 px-2 py-1 text-[10.5px] font-medium text-neutral-600">
                    {f}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
                <div>
                  <p className="font-mono text-base font-bold text-neutral-900">{w.rate}</p>
                  <p className="text-[10.5px] text-neutral-400">success rate</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-base font-bold text-neutral-900">{w.projects}</p>
                  <p className="text-[10.5px] text-neutral-400">projects</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
