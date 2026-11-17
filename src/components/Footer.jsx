import { Link } from 'react-router-dom'
import { Mail, Phone, MessageCircle, ArrowRight, ShieldCheck, Lock } from 'lucide-react'
import { brand, allServices, socialLinks } from '../data/brand'

const companyLinks = [
  { label: 'About Us', path: '/about-us' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'Blog', path: '/blogs' },
  { label: 'Order Now', path: '/order-now' },
  { label: 'Contact Us', path: '/contact-us' },
  { label: 'Sitemap', path: '/sitemap' },
]

const legalLinks = [
  { label: 'Terms & Conditions', path: '/terms-and-conditions' },
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Revision Policy', path: '/revision-policy' },
  { label: 'Refund Policy', path: '/refund-policy' },
]

function Column({ title, links }) {
  return (
    <div>
      <h3 className="mb-4 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-brass-300">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.path}>
            <Link to={l.path} className="text-[14px] text-white/60 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 100% 0%, rgba(184,149,106,0.12), transparent 60%)' }}
      />
      <div className="container-x relative pb-28 pt-16 lg:pb-12 lg:pt-20">
        {/* Top CTA strip */}
        <div className="flex flex-col gap-6 rounded-[24px] border border-white/10 bg-white/[0.04] p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-heading text-2xl font-semibold text-white sm:text-3xl">Have a deadline coming up?</p>
            <p className="mt-1.5 text-[14.5px] text-white/60">Get a free quote in under two minutes — no payment needed to ask.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/order-now" className="btn btn-brass">
              Get a free quote <ArrowRight size={15} />
            </Link>
            <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-ghost-light">
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-8">
          <div>
            <Link to="/" className="group inline-flex items-center gap-2.5" aria-label={`${brand.name} home`}>
              <img src="/logo-mark-white.png" alt="" className="h-10 w-auto transition-transform duration-300 group-hover:-rotate-3" />
              <span className="text-[17px] font-bold tracking-tight text-white">{brand.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-white/55">
              Academic writing support for university students worldwide — subject-matched writers, transparent pricing
              in your currency, and humane deadlines.
            </p>
            <div className="mt-6 space-y-3">
              <a href={`mailto:${brand.email}`} className="flex items-center gap-3 text-[14px] text-white/75 transition-colors hover:text-white">
                <Mail size={16} className="text-brass-300" /> {brand.email}
              </a>
              <a href={`tel:${brand.phoneTel}`} className="flex items-center gap-3 text-[14px] text-white/75 transition-colors hover:text-white">
                <Phone size={16} className="text-brass-300" /> {brand.phone}
              </a>
              <a href={`tel:${brand.phone2Tel}`} className="flex items-center gap-3 text-[14px] text-white/75 transition-colors hover:text-white">
                <Phone size={16} className="text-brass-300" /> {brand.phone2}
              </a>
            </div>
          </div>

          <Column title="Popular services" links={allServices.slice(0, 6)} />
          <Column title="Company" links={companyLinks} />
          <Column title="Legal" links={legalLinks} />
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <span className="text-[13px] text-white/45">
              &copy; {brand.copyrightYears} {brand.name}. All rights reserved.
            </span>
            <span className="flex items-center gap-4 text-[12px] text-white/45">
              <span className="flex items-center gap-1.5"><Lock size={13} /> Secure payments</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={13} /> 100% confidential</span>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 px-3.5 py-1.5 text-[12px] font-medium text-white/60 transition-colors hover:border-brass-400/60 hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
