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
        subtitle="Share your subject and what you need next. We usually reply within one business hour — by phone, WhatsApp, or email."
        crumbs={[{ label: 'Contact Us' }]}
      />

      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
          <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8" noValidate>
            <h2 className="font-heading text-lg font-bold tracking-tight text-neutral-900">Send a message</h2>
            <p className="mt-1 text-[13px] text-neutral-500">Tell us the subject and what you need next.</p>
            <div className="mt-6 grid gap-5">
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
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Send message'}
                {!submitting && <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />}
              </button>
            </div>
          </form>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6">
              <h2 className="text-[15px] font-bold text-neutral-900">Direct channels</h2>
              <ul className="mt-4 space-y-3">
                {channels.map((c) => {
                  const Icon = c.icon
                  return (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        target={c.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="group flex items-center gap-3 rounded-2xl border border-neutral-100 p-3 transition-colors hover:border-neutral-200 hover:bg-neutral-50"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white">
                          <Icon size={16} />
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-neutral-900">{c.label}</span>
                          <span className="block text-[12px] text-neutral-400">{c.sub}</span>
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-neutral-100 pt-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-neutral-200 px-3 py-1.5 text-[11px] font-semibold text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-neutral-200/80 bg-[#faf9f7] p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Response time</p>
              <p className="mt-2 font-heading text-2xl font-bold text-neutral-900">Under 1 hour</p>
              <p className="mt-1 text-[13px] text-neutral-500">During business hours, across every timezone we serve.</p>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
