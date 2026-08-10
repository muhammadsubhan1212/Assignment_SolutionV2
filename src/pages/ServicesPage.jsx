import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import OrderCTA from '../components/OrderCTA'
import { serviceNavGroups } from '../data/brand'
import { img, servicePhotos } from '../data/images'

const tilePhotos = [
  ...servicePhotos,
  { src: img.studentPlanning, alt: 'Student planning academic work' },
  { src: img.editorDocs, alt: 'Editor reviewing documents' },
  { src: img.consultantDesk, alt: 'Consultant at a desk' },
  { src: img.workspace2, alt: 'Laptop workspace with notes' },
  { src: img.resumeReview, alt: 'Career document review' },
  { src: img.officeDesk, alt: 'Professional office desk' },
  { src: img.studentReading, alt: 'Student reading research materials' },
]

export default function ServicesPage() {
  let photoIndex = 0

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
        image={img.bookLaptop}
      />

      <div className="bg-mist-50">
        <div className="mx-auto max-w-6xl space-y-16 px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          {serviceNavGroups.map((group, gi) => (
            <section key={group.title}>
              <div className="mb-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass-600">
                  0{gi + 1} · {group.title}
                </p>
                <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">
                  {group.title}
                </h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item, i) => {
                  const photo = tilePhotos[photoIndex % tilePhotos.length]
                  photoIndex += 1
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
                    >
                      <Link to={item.path} className="group block">
                        <div className="relative aspect-[4/3] overflow-hidden bg-ink-900">
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            loading="lazy"
                            className="img-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/25 to-transparent" />
                          <div className="absolute inset-x-0 bottom-0 p-5">
                            <div className="flex items-end justify-between gap-3">
                              <h3 className="font-heading text-lg font-semibold text-white">{item.label}</h3>
                              <ArrowUpRight
                                size={16}
                                className="mb-0.5 shrink-0 text-brass-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              />
                            </div>
                            <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-white/70">{item.blurb}</p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      <OrderCTA title="Not sure which service fits?" body="Tell us about your brief and we'll recommend the right approach — no obligation." primaryLabel="Get a quote" secondaryLabel="Ask a question" />
    </>
  )
}
