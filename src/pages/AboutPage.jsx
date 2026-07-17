import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import OrderCTA from '../components/OrderCTA'

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
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5 text-[15px] leading-relaxed text-neutral-600">
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
          <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8">
            <h2 className="font-heading text-lg font-bold tracking-tight text-neutral-900">What we stand for</h2>
            <ul className="mt-5 space-y-3.5">
              {values.map((item) => (
                <li key={item} className="flex gap-3 border-b border-neutral-100 pb-3.5 text-[14px] leading-relaxed text-neutral-600 last:border-0 last:pb-0">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-800/60 sm:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-neutral-900 p-8 text-center"
              >
                <p className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">{s.value}</p>
                <p className="mt-2 text-sm text-neutral-400">{s.label}</p>
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
