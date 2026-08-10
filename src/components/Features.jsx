import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { img } from '../data/images'

const features = [
  {
    title: 'Discipline-first matching',
    body: 'Writers are selected for course-level expertise — nursing, law, engineering, humanities — not a general queue.',
    image: img.studentConsulting,
  },
  {
    title: 'Research that holds up',
    body: 'Primary sources, clean citation styles, and methodology notes you can explain in a viva or seminar.',
    image: img.researcherAnalyzing2,
  },
  {
    title: 'Human editorial polish',
    body: 'Editors review structure, tone, and formatting before delivery so drafts feel submission-ready.',
    image: img.editorManuscript,
  },
]

export default function Features() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 })

  return (
    <section ref={ref} className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass-600">Craft</p>
          <h2 className="mt-3 font-heading text-[clamp(2rem,4vw,3.25rem)] font-semibold text-ink-950">
            Three things we never compromise
          </h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.1 }}
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <img src={f.image} alt="" loading="lazy" className="img-cover" />
              </div>
              <h3 className="mt-5 font-heading text-2xl font-semibold text-ink-950">{f.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600">{f.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
