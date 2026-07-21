import { Link } from 'react-router-dom'
import { Mail, Phone, MessageCircle } from 'lucide-react'
import { brand, allServices, socialLinks } from '../data/brand'

const companyLinks = [
  { label: 'About Us', path: '/about-us' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'Blog', path: '/blogs' },
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
      <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.path}>
            <Link to={l.path} className="text-[13.5px] text-neutral-500 transition-colors hover:text-neutral-900">
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
    <footer className="border-t border-neutral-100 bg-white">
      <div className="mx-auto max-w-6xl px-5 pb-28 pt-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8">
          {/* Brand + contact */}
          <div>
            <Link to="/" className="group inline-flex items-center gap-2.5" aria-label={`${brand.name} home`}>
              <img
                src="/logo-mark.png"
                alt={`${brand.name} logo`}
                className="h-10 w-auto transition-transform duration-300 group-hover:-rotate-3"
              />
              <span className="text-[16px] font-semibold tracking-tight text-neutral-900">{brand.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-neutral-500">
              Academic writing support for university students worldwide — subject-matched writers, transparent
              pricing in your currency, and humane deadlines.
            </p>
            <div className="mt-6 space-y-2.5">
              <a href={`mailto:${brand.email}`} className="flex items-center gap-2.5 text-[13.5px] text-neutral-600 transition-colors hover:text-neutral-900">
                <Mail size={15} className="text-neutral-400" /> {brand.email}
              </a>
              <a href={`tel:${brand.phoneTel}`} className="flex items-center gap-2.5 text-[13.5px] text-neutral-600 transition-colors hover:text-neutral-900">
                <Phone size={15} className="text-neutral-400" /> {brand.phone}
              </a>
              <a href={`tel:${brand.phone2Tel}`} className="flex items-center gap-2.5 text-[13.5px] text-neutral-600 transition-colors hover:text-neutral-900">
                <Phone size={15} className="text-neutral-400" /> {brand.phone2}
              </a>
              <a
                href={`https://wa.me/${brand.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-[13.5px] text-neutral-600 transition-colors hover:text-neutral-900"
              >
                <MessageCircle size={15} className="text-neutral-400" /> WhatsApp the desk
              </a>
            </div>
          </div>

          <Column title="Popular Services" links={allServices.slice(0, 6)} />
          <Column title="Company" links={companyLinks} />
          <Column title="Legal" links={legalLinks} />
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-neutral-100 pt-6 sm:flex-row">
          <span className="text-xs text-neutral-400">
            &copy; {brand.copyrightYears} {brand.name}. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium text-neutral-400 transition-colors hover:text-neutral-900"
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
