import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import OrderCTA from '../components/OrderCTA'
import { img, writerPhotos, whyPhotos } from '../data/images'

const values = [
  'Ethical academic support that helps you learn from strong drafts',
  'Subject-aware pairing instead of anonymous guesswork',
  'Clear communication from first quote to final handoff',
  'Respect for privacy, originality standards, and fair timelines',
]

const stats = [
  { value: '15,000+', label: 'Projects delivered' },
  { value: '300+', label: 'Vetted specialists' },
  { value: '98%', label: 'On-time delivery' },
  { value: '4.9/5', label: 'Average rating' },
]

const mosaic = [
  writerPhotos[0],
  whyPhotos[0],
  writerPhotos[1],
  whyPhotos[2],
  writerPhotos[2],
]

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn how Assignment Solution supports students with ethical, subject-matched academic writing and transparent coordination."
        path="/about-us"
      />
      <PageHeader
        eyebrow="Who we are"
        title="A modern academic writing studio"
        subtitle="For students who value clarity, originality, and humane deadlines — wherever in the world they study."
        crumbs={[{ label: 'About Us' }]}
        image={img.writers}
      />

      <section className="bg-mist-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass-600">Our story</p>
              <h2 className="mt-3 font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-ink-950">
                Coordination-first writing support
              </h2>
              <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-600">
                <p>
                  Assignment Solution grew from a simple observation: students rarely fail for lack of ambition — they
                  fail when workload outpaces time. We built a coordination-first writing desk that matches each brief
                  to a specialist, keeps quotes transparent in your local currency, and treats revisions as part of the
                  craft.
                </p>
                <p>
                  Whether you are shaping an undergraduate essay, polishing a research proposal, or preparing a graduate
                  thesis chapter, our writers and editors work as an extension of your planning process — not a
                  black-box mill.
                </p>
                <p>
                  We serve students across the UK, USA, Australia, New Zealand, Canada, Europe, South Korea, the Middle
                  East, and beyond, adapting to referencing styles and institutional expectations wherever you are.
                </p>
              </div>

              <div className="mt-10 border-t border-mist-200 pt-8">
                <h3 className="font-heading text-lg font-semibold tracking-tight text-ink-950">What we stand for</h3>
                <ul className="mt-5 space-y-3.5">
                  {values.map((item) => (
                    <li key={item} className="flex gap-3 border-b border-mist-200 pb-3.5 text-[14px] leading-relaxed text-ink-600 last:border-0 last:pb-0">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-3 self-start"
            >
              <div className="space-y-3 pt-8">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={mosaic[0]} alt="" loading="lazy" className="img-cover" />
                </div>
                <div className="relative aspect-square overflow-hidden">
                  <img src={mosaic[1]} alt="" loading="lazy" className="img-cover" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="relative aspect-square overflow-hidden">
                  <img src={mosaic[2]} alt="" loading="lazy" className="img-cover" />
                </div>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={mosaic[3]} alt="" loading="lazy" className="img-cover" />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={mosaic[4]} alt="" loading="lazy" className="img-cover" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-ink-950 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-brass-300">By the numbers</p>
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-ink-800 bg-ink-800/60 sm:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-ink-950 p-8 text-center"
              >
                <p className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">{s.value}</p>
                <p className="mt-2 text-sm text-white/50">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <OrderCTA
        title="Build your next draft with the desk"
        body="Share your syllabus notes and deadline — we map next steps with a writer who knows your field."
      />
    </>
  )
}
