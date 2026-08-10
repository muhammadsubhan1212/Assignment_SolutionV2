import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Mail, Phone, MessageCircle, ArrowRight } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import { Field, Input, Select, Textarea } from '../components/Field'
import { brand, socialLinks } from '../data/brand'
import { submitContact } from '../services/fareService'
import { isValidEmail } from '../utils/helpers'
import { img } from '../data/images'

const subjectOptions = ['General enquiry', 'New order', 'Existing order', 'Revision request', 'Billing', 'Other']

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', email: '', phone: '', subject: 'General enquiry', detail: '' } })

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const result = await submitContact(values)
      if (!result.success) {
        toast.error(result.message)
        return
      }
      toast.success(result.message)
      reset()
    } catch {
      toast.error('Unable to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const channels = [
    { icon: Phone, label: brand.phone, href: `tel:${brand.phoneTel}`, sub: 'Call the desk' },
    { icon: Phone, label: brand.phone2, href: `tel:${brand.phone2Tel}`, sub: 'Alternate line' },
    { icon: MessageCircle, label: 'WhatsApp the desk', href: `https://wa.me/${brand.whatsapp}`, sub: 'Fastest response' },
    { icon: Mail, label: brand.email, href: `mailto:${brand.email}`, sub: 'Email us anytime' },
  ]

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

      <section className="flex min-h-[70vh] flex-col lg:flex-row">
        {/* Left — channels / atmosphere */}
        <div className="relative flex flex-col justify-center overflow-hidden bg-ink-950 px-8 py-16 sm:px-12 lg:w-[40%] lg:px-16 lg:py-24">
          <img
            src={img.consultantOnline}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink-950/80" />
          <div className="relative z-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass-300">Direct channels</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Reach the desk
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/65">
              We usually reply within one business hour — by phone, WhatsApp, or email.
            </p>

            <ul className="mt-10 space-y-4">
              {channels.map((c) => {
                const Icon = c.icon
                return (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="group flex items-center gap-3"
                    >
                      <span className="flex h-10 w-10 items-center justify-center border border-white/15 bg-white/5 text-brass-300 transition-colors group-hover:border-brass-400">
                        <Icon size={16} />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-white">{c.label}</span>
                        <span className="block text-[12px] text-white/45">{c.sub}</span>
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className="mt-10 space-y-4 border-t border-white/10 pt-8">
              <div>
                <p className="mb-1 text-xs uppercase tracking-widest text-brass-300/70">Hours</p>
                <p className="text-base text-white">24/7 — Always available</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-white/70 transition-colors hover:border-brass-400 hover:text-brass-300"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="flex flex-col justify-center bg-mist-50 px-8 py-16 sm:px-12 lg:w-[60%] lg:px-20 lg:py-24">
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full max-w-lg" noValidate>
            <h2 className="font-heading text-xl font-semibold tracking-tight text-ink-950">Send a message</h2>
            <p className="mt-1.5 text-[13px] text-ink-600">Tell us the subject and what you need next.</p>
            <div className="mt-8 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" error={errors.name?.message} htmlFor="c-name">
                  <Input id="c-name" invalid={!!errors.name} {...register('name', { required: 'Name is required' })} />
                </Field>
                <Field label="Email" error={errors.email?.message} htmlFor="c-email">
                  <Input
                    id="c-email"
                    type="email"
                    invalid={!!errors.email}
                    {...register('email', { required: 'Email is required', validate: (v) => isValidEmail(v) || 'Enter a valid email' })}
                  />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Phone" htmlFor="c-phone">
                  <Input id="c-phone" type="tel" placeholder="+44 …" {...register('phone')} />
                </Field>
                <Field label="Subject" htmlFor="c-subject">
                  <Select id="c-subject" {...register('subject')}>
                    {subjectOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </Select>
                </Field>
              </div>
              <Field label="Message" error={errors.detail?.message} htmlFor="c-detail">
                <Textarea
                  id="c-detail"
                  rows={5}
                  invalid={!!errors.detail}
                  {...register('detail', { required: 'Message is required', minLength: { value: 10, message: 'Please add more detail' } })}
                />
              </Field>
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex w-full items-center justify-center gap-2 bg-ink-950 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-ink-800 disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Send message'}
                {!submitting && <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />}
              </button>
              <p className="text-center text-xs text-ink-400">We respond within 30 minutes</p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
