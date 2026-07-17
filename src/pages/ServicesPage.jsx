import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import OrderCTA from '../components/OrderCTA'
import { serviceNavGroups } from '../data/brand'

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Services"
        description="Explore Assignment Solution's academic writing services — essays, research papers, theses, dissertations, editing, and content writing for students worldwide."
        path="/services"
      />
      <PageHeader
        eyebrow="What we do"
        title="Services for every stage of study"
        subtitle="From a single essay to a full dissertation, each brief is matched to a specialist writer and priced transparently in your local currency."
        crumbs={[{ label: 'Services' }]}
      />

      <div className="mx-auto max-w-6xl space-y-16 px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        {serviceNavGroups.map((group, gi) => (
          <section key={group.title}>
            <div className="mb-6 flex items-baseline gap-3">
              <span className="font-mono text-sm text-neutral-300">0{gi + 1}</span>
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">{group.title}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
                >
                  <Link
                    to={item.path}
                    className="group flex h-full flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_18px_40px_-16px_rgba(0,0,0,0.14)]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-semibold text-neutral-900">{item.label}</h3>
                        <ArrowUpRight
                          size={16}
                          className="mt-0.5 shrink-0 text-neutral-300 transition-all duration-300 group-hover:text-neutral-900"
                        />
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-500">{item.blurb}</p>
                    </div>
                    <span className="mt-5 text-[13px] font-medium text-neutral-400 transition-colors group-hover:text-violet-600">
                      Learn more
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <OrderCTA title="Not sure which service fits?" body="Tell us about your brief and we'll recommend the right approach — no obligation." primaryLabel="Get a quote" secondaryLabel="Ask a question" />
    </>
  )
}
