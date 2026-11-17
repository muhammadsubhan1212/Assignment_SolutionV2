import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { img } from '../data/images'
import { brand } from '../data/brand'

export default function CTABanner() {
  return (
    <section className="bg-white pb-16 sm:pb-24">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative isolate overflow-hidden rounded-[30px] bg-ink-950 px-6 py-14 sm:px-12 sm:py-20 lg:px-16"
        >
          <img src={img.studentRelaxing} alt="" className="absolute inset-0 -z-10 img-cover opacity-30" loading="lazy" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/90 to-ink-950/40" />
          <div
            className="absolute inset-0 -z-10"
            style={{ background: 'radial-gradient(ellipse 50% 70% at 100% 100%, rgba(184,149,106,0.35), transparent 60%)' }}
          />

          <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_auto]">
            <div className="max-w-2xl">
              <p className="eyebrow eyebrow-light">{brand.name}</p>
              <h2 className="mt-4 font-heading text-[clamp(2.1rem,5vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
                Clear writing. <span className="italic text-brass-300">Confident grades.</span>
              </h2>
              <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-white/65">
                Share your brief in two minutes. New students save 15% on their first project.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link to="/order-now" className="btn btn-brass btn-lg group">
                Place an order <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-ghost-light btn-lg">
                <MessageCircle size={17} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
