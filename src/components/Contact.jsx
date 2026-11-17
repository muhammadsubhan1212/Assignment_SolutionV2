import { motion } from 'framer-motion'
import { Mail, Phone, MessageCircle, Clock } from 'lucide-react'
import { brand } from '../data/brand'
import ContactForm from './ContactForm'
import SectionHeading from './SectionHeading'

export const contactChannels = [
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with the desk', href: `https://wa.me/${brand.whatsapp}` },
  { icon: Phone, label: 'Call us', value: brand.phone, href: `tel:${brand.phoneTel}` },
  { icon: Phone, label: 'Alternate line', value: brand.phone2, href: `tel:${brand.phone2Tel}` },
  { icon: Mail, label: 'Email', value: brand.email, href: `mailto:${brand.email}` },
]

export function ContactChannels({ dark = true }) {
  return (
    <ul className="grid gap-3">
      {contactChannels.map(({ icon: Icon, label, value, href }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className={`group flex items-center gap-4 rounded-2xl border p-4 transition-colors ${
              dark ? 'border-white/10 bg-white/[0.04] hover:border-brass-400/50' : 'border-mist-200 bg-white hover:border-brass-300'
            }`}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brass-400 text-ink-950">
              <Icon size={18} />
            </span>
            <span className="min-w-0">
              <span className={`block text-[11.5px] font-semibold uppercase tracking-[0.12em] ${dark ? 'text-white/45' : 'text-ink-400'}`}>{label}</span>
              <span className={`block truncate text-[14.5px] font-semibold ${dark ? 'text-white' : 'text-ink-950'}`}>{value}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="section-y bg-[#fbfaf7]">
      <div className="container-x">
        <div className="grid overflow-hidden rounded-[30px] border border-mist-200 bg-white shadow-[var(--shadow-lift)] lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-ink-950 p-6 sm:p-10 lg:p-12"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(ellipse 70% 50% at 0% 0%, rgba(184,149,106,0.22), transparent 60%)' }}
            />
            <div className="relative">
              <SectionHeading
                dark
                eyebrow="Get in touch"
                title="Let's talk about your project"
                intro="Share your requirements and we'll match you with the right expert."
              />
              <div className="mt-8">
                <ContactChannels />
              </div>
              <p className="mt-6 flex items-center gap-2 text-[13px] text-white/55">
                <Clock size={15} className="text-brass-300" /> Open 24/7 — including weekends
              </p>
            </div>
          </motion.div>

          <div className="p-6 sm:p-10 lg:p-12">
            <h3 className="font-heading text-2xl font-semibold text-ink-950">Send us a message</h3>
            <p className="mb-7 mt-1.5 text-[14px] text-ink-600">Goes straight to our inbox — we'll reply by email.</p>
            <ContactForm idPrefix="home" />
          </div>
        </div>
      </div>
    </section>
  )
}
