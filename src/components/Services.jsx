import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { FileText, GraduationCap, Calculator, Code, FlaskConical, BarChart3 } from 'lucide-react'

const services = [
  {
    icon: FileText,
    title: 'Essay & Research Writing',
    description: 'Compelling arguments, rigorous methodology, and flawless structure across every discipline.',
    tags: ['APA', 'MLA', 'Chicago', 'Harvard'],
    accent: '#4f46e5',
  },
  {
    icon: GraduationCap,
    title: 'Dissertation & Thesis',
    description: 'Full lifecycle support — from proposal through defense preparation.',
    tags: ['PhD Level', 'Masters', 'Literature Review'],
    accent: '#7c3aed',
  },
  {
    icon: Calculator,
    title: 'Mathematics & Statistics',
    description: 'Complex proofs, SPSS/R analyses, and visual data interpretation.',
    tags: ['SPSS', 'R Studio', 'MATLAB'],
    accent: '#0891b2',
  },
  {
    icon: Code,
    title: 'Programming & CS',
    description: 'Clean, documented code with testing — Python, Java, C++, web development.',
    tags: ['Python', 'Java', 'Full Stack'],
    accent: '#059669',
  },
  {
    icon: FlaskConical,
    title: 'Lab Reports & Sciences',
    description: 'Publication-quality reports with methodology, figures, and error analysis.',
    tags: ['Biology', 'Chemistry', 'Physics'],
    accent: '#dc2626',
  },
  {
    icon: BarChart3,
    title: 'Business & Case Studies',
    description: 'Strategic analysis with frameworks, financial modeling, and actionable insights.',
    tags: ['SWOT', "Porter's", 'Financial'],
    accent: '#d97706',
  },
]

// Faux document editor mockup component
function DocumentEditorMockup() {
  return (
    <div className="relative w-full rounded-2xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-200/60 overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-100 bg-neutral-50/80">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="ml-3 text-xs text-neutral-400 font-medium">Research_Paper_Final.docx</div>
      </div>
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-neutral-100">
        <div className="flex gap-1">
          {['B', 'I', 'U'].map((l) => (
            <div key={l} className="w-6 h-6 rounded text-xs flex items-center justify-center text-neutral-500 hover:bg-neutral-100 font-semibold">
              {l}
            </div>
          ))}
        </div>
        <div className="w-px h-4 bg-neutral-200" />
        <div className="text-xs text-neutral-400">Times New Roman</div>
        <div className="text-xs text-neutral-400 ml-auto">Page 1 of 12</div>
      </div>
      {/* Document content */}
      <div className="p-6 space-y-3">
        <div className="h-3 bg-neutral-900 rounded-full w-3/4" />
        <div className="h-2 bg-neutral-200 rounded-full w-full mt-4" />
        <div className="h-2 bg-neutral-200 rounded-full w-full" />
        <div className="h-2 bg-neutral-200 rounded-full w-5/6" />
        <div className="h-2 bg-neutral-200 rounded-full w-full mt-3" />
        <div className="h-2 bg-neutral-200 rounded-full w-4/5" />
        <div className="h-2 bg-indigo-200 rounded-full w-full mt-3" />
        <div className="h-2 bg-indigo-200 rounded-full w-2/3" />
        <div className="h-2 bg-neutral-200 rounded-full w-full mt-3" />
        <div className="h-2 bg-neutral-200 rounded-full w-11/12" />
        <div className="h-2 bg-neutral-200 rounded-full w-3/4" />
      </div>
      {/* Floating annotation */}
      <div className="absolute right-4 top-32 bg-amber-50 border border-amber-200 rounded-lg p-2.5 shadow-sm max-w-[140px]">
        <div className="text-[10px] font-semibold text-amber-700 mb-1">Comment</div>
        <div className="text-[9px] text-amber-600 leading-tight">Strengthen this thesis with more evidence from...</div>
      </div>
    </div>
  )
}

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  const { ref: rightRef, inView: rightInView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="services" ref={ref} className="py-28 sm:py-40 bg-white relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section header — editorial, offset */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 sm:mb-28"
        >
          <span className="text-xs font-semibold text-neutral-400 tracking-[0.2em] uppercase block mb-6">
            What we do
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-[1.1] max-w-2xl">
            Every discipline.
            <br />
            <span className="text-neutral-300 italic font-light">One platform.</span>
          </h2>
        </motion.div>

        {/* Main editorial layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Left — Featured service with document editor mockup (60%) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-7 relative"
          >
            {/* Giant number overlay */}
            <span className="absolute -top-10 -left-4 text-[180px] sm:text-[220px] font-bold text-neutral-50 leading-none select-none pointer-events-none z-0">
              01
            </span>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="text-xs font-semibold text-indigo-600 tracking-wide uppercase">Featured</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
                {services[0].title}
              </h3>
              <p className="text-neutral-500 leading-relaxed mb-8 max-w-md text-base">
                {services[0].description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {services[0].tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Document editor mockup */}
              <DocumentEditorMockup />
            </div>
          </motion.div>

          {/* Right — Staggered service list */}
          <div ref={rightRef} className="lg:col-span-5 space-y-6 lg:pt-16">
            {services.slice(1).map((service, i) => {
              const num = String(i + 2).padStart(2, '0')
              const Icon = service.icon

              // Varied visual treatments
              if (i === 0) {
                // Dark card treatment
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={rightInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    className="relative bg-neutral-900 rounded-3xl p-6 sm:p-7 overflow-hidden"
                  >
                    <span className="absolute -top-2 -right-2 text-[100px] font-bold text-neutral-800 leading-none select-none pointer-events-none">
                      {num}
                    </span>
                    <div className="relative z-10">
                      <Icon className="w-5 h-5 text-violet-400 mb-3" />
                      <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">{service.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {service.tags.map((tag) => (
                          <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-neutral-800 text-neutral-400 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              }

              if (i === 1) {
                // Minimal text-only with bold number prefix
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={rightInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    className="relative pl-16 py-4"
                  >
                    <span className="absolute left-0 top-2 text-5xl font-bold text-neutral-200 leading-none">
                      {num}
                    </span>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-cyan-600" />
                      <h3 className="text-base font-semibold text-neutral-900">{service.title}</h3>
                    </div>
                    <p className="text-sm text-neutral-500 leading-relaxed">{service.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {service.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-cyan-50 text-cyan-700 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )
              }

              if (i === 2) {
                // Card with left accent bar and offset
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={rightInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    className="relative ml-6 border-l-4 border-emerald-500 bg-emerald-50/50 rounded-r-2xl p-5 sm:p-6"
                  >
                    <span className="absolute -top-4 -left-8 text-6xl font-bold text-emerald-100 leading-none select-none pointer-events-none">
                      {num}
                    </span>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4 text-emerald-600" />
                        <h3 className="text-base font-semibold text-neutral-900">{service.title}</h3>
                      </div>
                      <p className="text-sm text-neutral-500 leading-relaxed">{service.description}</p>
                    </div>
                  </motion.div>
                )
              }

              if (i === 3) {
                // Full-width with large icon background
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={rightInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    className="relative rounded-2xl border border-red-100 bg-white p-5 sm:p-6 overflow-hidden"
                  >
                    <Icon className="absolute -bottom-3 -right-3 w-24 h-24 text-red-50 rotate-12 pointer-events-none" />
                    <span className="absolute top-3 right-4 text-4xl font-bold text-red-100 leading-none select-none">
                      {num}
                    </span>
                    <div className="relative z-10">
                      <h3 className="text-base font-semibold text-neutral-900 mb-2">{service.title}</h3>
                      <p className="text-sm text-neutral-500 leading-relaxed">{service.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {service.tags.map((tag) => (
                          <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-red-50 text-red-600 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              }

              // Default: clean bordered card with oversized number
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={rightInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="relative rounded-xl border border-amber-200 bg-amber-50/30 p-5 sm:p-6"
                >
                  <span className="absolute -top-3 left-4 text-5xl font-bold text-amber-200 leading-none select-none pointer-events-none">
                    {num}
                  </span>
                  <div className="relative z-10 pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-amber-600" />
                      <h3 className="text-base font-semibold text-neutral-900">{service.title}</h3>
                    </div>
                    <p className="text-sm text-neutral-500 leading-relaxed">{service.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {service.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-amber-100 text-amber-700 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA — offset right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-20 sm:mt-28 flex justify-end"
        >
          <Link
            to="/services"
            className="group inline-flex items-center gap-3 text-sm font-medium text-neutral-900 hover:text-indigo-600 transition-colors"
          >
            <span className="text-base">Explore all services</span>
            <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
