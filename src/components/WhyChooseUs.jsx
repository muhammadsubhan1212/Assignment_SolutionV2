import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const reasons = [
  {
    title: 'Expert Writers',
    description: 'PhD holders and published researchers matched precisely to your subject area and academic level.',
    stat: '300+',
    statLabel: 'vetted specialists',
  },
  {
    title: 'Zero Plagiarism',
    description: 'Every piece written from scratch. Turnitin report included. Our platform has a 99.8% originality rate.',
    stat: '0%',
    statLabel: 'plagiarism rate',
  },
  {
    title: 'On-Time, Always',
    description: 'We\'ve never missed a deadline. Track progress in real-time and get milestone updates.',
    stat: '98%',
    statLabel: 'on-time delivery',
  },
  {
    title: '24/7 Support',
    description: 'Direct access to your writer. Live chat with our team. Revision requests handled within hours.',
    stat: '<2hr',
    statLabel: 'avg response time',
  },
]

export default function WhyChooseUs() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 sm:mb-20"
        >
          <p className="text-xs font-medium text-neutral-500 tracking-[0.2em] uppercase mb-4">
            Why Assignment Solution
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight max-w-lg">
            Built different from
            <br />
            <span className="text-neutral-300">the rest.</span>
          </h2>
        </motion.div>

        {/* Reasons grid — 2x2 on desktop, stacked on mobile */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              className="group relative p-8 sm:p-10 rounded-2xl border border-neutral-100 bg-neutral-50/50 hover:bg-white hover:border-neutral-200 hover:shadow-xl hover:shadow-neutral-100/80 transition-all duration-500"
            >
              {/* Large stat in the top-right */}
              <div className="absolute top-6 right-8 text-right">
                <span className="text-3xl sm:text-4xl font-bold font-mono text-neutral-900 tracking-tighter">
                  {reason.stat}
                </span>
                <p className="text-[11px] text-neutral-400 mt-0.5">{reason.statLabel}</p>
              </div>

              <div className="max-w-[70%]">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">{reason.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{reason.description}</p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
