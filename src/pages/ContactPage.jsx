import { Clock, ShieldCheck, Zap } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import ContactForm from '../components/ContactForm'
import { ContactChannels } from '../components/Contact'
import { socialLinks } from '../data/brand'
import { img } from '../data/images'

const promises = [
  { icon: Zap, title: 'Fast replies', body: 'Most messages answered within 30 minutes.' },
  { icon: Clock, title: 'Open 24/7', body: 'Weekends and holidays included.' },
  { icon: ShieldCheck, title: 'Private', body: 'Your details are never shared.' },
]

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with the Assignment Solution academic team for quotes, status updates, and writing support — usually within one business hour."
        path="/contact-us"
      />
      <PageHeader
        eyebrow="Get in touch"
        title="Let's talk about your project"
        subtitle="Share your requirements and we'll match you with the perfect expert for your assignment."
        crumbs={[{ label: 'Contact Us' }]}
        image={img.consultantOnline2}
      />

      <section className="bg-[#fbfaf7] pb-20 pt-12 sm:pb-28 sm:pt-16">
        <div className="container-x grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          <aside className="space-y-6">
            <div className="relative overflow-hidden rounded-[26px] bg-ink-950 p-6 sm:p-8">
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(ellipse 70% 50% at 0% 0%, rgba(184,149,106,0.22), transparent 60%)' }}
              />
              <div className="relative">
                <p className="eyebrow eyebrow-light">Direct channels</p>
                <h2 className="mt-3 font-heading text-3xl font-semibold text-white">Reach the desk</h2>
                <p className="mb-7 mt-3 text-[14.5px] leading-relaxed text-white/60">Phone, WhatsApp or email — whichever suits you.</p>
                <ContactChannels />
                <div className="mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-6">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/15 px-3.5 py-1.5 text-[12px] font-semibold text-white/70 transition-colors hover:border-brass-400 hover:text-brass-300"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {promises.map(({ icon: Icon, title, body }) => (
                <div key={title} className="card flex items-start gap-4 p-5">
                  <span className="icon-chip h-10 w-10 shrink-0">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="text-[15px] font-bold text-ink-950">{title}</p>
                    <p className="mt-0.5 text-[13.5px] text-ink-600">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <div className="card p-6 sm:p-10">
            <p className="eyebrow">Message us</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-ink-950">Send a message</h2>
            <p className="mb-8 mt-2 text-[14.5px] text-ink-600">Tell us the subject and what you need next — it lands straight in our inbox.</p>
            <ContactForm idPrefix="page" />
          </div>
        </div>
      </section>
    </>
  )
}
