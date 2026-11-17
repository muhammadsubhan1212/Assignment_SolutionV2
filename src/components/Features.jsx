import { motion } from 'framer-motion'
import { img } from '../data/images'
import SectionHeading from './SectionHeading'

const features = [
  {
    n: '01',
    title: 'Discipline-first matching',
    body: 'Writers are selected for course-level expertise — nursing, law, engineering, humanities — not a general queue.',
    image: img.studentConsulting,
  },
  {
    n: '02',
    title: 'Research that holds up',
    body: 'Primary sources, clean citation styles, and methodology notes you can explain in a viva or seminar.',
    image: img.researcherAnalyzing2,
  },
  {
    n: '03',
    title: 'Human editorial polish',
    body: 'Editors review structure, tone and formatting before delivery so drafts feel submission-ready.',
    image: img.editorManuscript,
  },
]

export default function Features() {
  return (
    <section className="section-y bg-[#fbfaf7]">
      <div className="container-x">
        <SectionHeading align="center" eyebrow="Our craft" title="Three things we never compromise" />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="card card-hover group overflow-hidden p-2.5"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[16px]">
                <img src={f.image} alt="" loading="lazy" className="img-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold tracking-wider text-ink-950 backdrop-blur">
                  {f.n}
                </span>
              </div>
              <div className="p-4 pb-5 sm:p-5">
                <h3 className="font-heading text-[22px] font-semibold text-ink-950">{f.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-600">{f.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
