import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { reviews } from '../data/home'
import SectionHeading from './SectionHeading'

const tints = ['#e0ccad', '#c5d3de', '#ccae7f', '#dde3df', '#f0e6d6', '#9bb3c4']

export default function Testimonials() {
  const track = useRef(null)
  const scroll = (dir) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector('article')
    el.scrollBy({ left: dir * ((card?.offsetWidth || 360) + 20), behavior: 'smooth' })
  }

  return (
    <section className="section-y relative overflow-hidden bg-ink-950">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 10% 100%, rgba(184,149,106,0.16), transparent 60%)' }}
      />
      <div className="container-x relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading dark eyebrow="Reviews" title="Voices from campuses worldwide">
            <div className="mt-6 flex items-center gap-3">
              <div className="flex gap-0.5 text-brass-300">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <span className="text-[14px] font-semibold text-white">4.9 / 5</span>
              <span className="text-[13px] text-white/50">from verified orders</span>
            </div>
          </SectionHeading>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => scroll(-1)} aria-label="Previous reviews" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-brass-400 hover:text-brass-300">
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Next reviews" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-brass-400 hover:text-brass-300">
              <ChevronRight size={20} />
            </button>
            <Link to="/reviews" className="btn btn-ghost-light ml-2 hidden sm:inline-flex">
              All reviews <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <div
          ref={track}
          className="scrollbar-hide -mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
        >
          {reviews.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: Math.min(i, 3) * 0.07 }}
              className="flex w-[85%] shrink-0 snap-start flex-col rounded-[22px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur sm:w-[360px] sm:p-7"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5 text-brass-300">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={14} fill="currentColor" />
                  ))}
                </div>
                <Quote size={26} className="text-white/15" />
              </div>
              <p className="mt-5 text-[15.5px] leading-relaxed text-white/85">“{r.quote}”</p>
              <footer className="mt-auto flex items-center gap-3 pt-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full text-[13px] font-bold text-ink-950" style={{ background: tints[i % tints.length] }}>
                  {r.initials || r.name.slice(0, 2)}
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-white">{r.name}</p>
                  <p className="text-[12.5px] text-white/50">
                    {r.role} · {r.city}
                  </p>
                </div>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
