import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { Field, Input, Select, Textarea } from './Field'
import { submitContact } from '../services/fareService'
import { isValidEmail } from '../utils/helpers'

const subjectOptions = ['General enquiry', 'New order / quote', 'Existing order', 'Revision request', 'Billing', 'Other']

export default function ContactForm({ idPrefix = 'c' }) {
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', email: '', phone: '', subject: subjectOptions[0], detail: '', website: '' } })

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const result = await submitContact(values)
      if (!result.success) {
        toast.error(result.message)
        return
      }
      toast.success(result.message)
      setSent(values.name)
      reset()
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-[22px] border border-emerald-100 bg-emerald-50/60 px-6 py-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 size={28} />
        </span>
        <h3 className="mt-5 font-heading text-2xl font-semibold text-ink-950">Thanks, {sent.split(' ')[0]}!</h3>
        <p className="mt-2 max-w-sm text-[14.5px] leading-relaxed text-ink-600">
          Your message is with our desk. We have sent a confirmation to your inbox and will reply shortly.
        </p>
        <button type="button" onClick={() => setSent(null)} className="btn btn-outline btn-sm mt-6">
          Send another message
        </button>
      </div>
    )
  }

  const id = (k) => `${idPrefix}-${k}`

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
      {/* Honeypot: hidden from people, bots fill it in */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id('website')}>Website</label>
        <input id={id('website')} tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name?.message} htmlFor={id('name')}>
          <Input id={id('name')} autoComplete="name" placeholder="Jane Doe" invalid={!!errors.name} {...register('name', { required: 'Please enter your name' })} />
        </Field>
        <Field label="Email" error={errors.email?.message} htmlFor={id('email')}>
          <Input
            id={id('email')}
            type="email"
            autoComplete="email"
            placeholder="you@university.edu"
            invalid={!!errors.email}
            {...register('email', { required: 'Please enter your email', validate: (v) => isValidEmail(v) || 'Enter a valid email' })}
          />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone / WhatsApp" hint="Optional" htmlFor={id('phone')}>
          <Input id={id('phone')} type="tel" autoComplete="tel" placeholder="+44 7700 900000" {...register('phone')} />
        </Field>
        <Field label="Subject" htmlFor={id('subject')}>
          <Select id={id('subject')} {...register('subject')}>
            {subjectOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label="How can we help?" error={errors.detail?.message} htmlFor={id('detail')}>
        <Textarea
          id={id('detail')}
          rows={5}
          placeholder="Tell us about your assignment, deadline and any questions…"
          invalid={!!errors.detail}
          {...register('detail', { required: 'Please write a short message', minLength: { value: 10, message: 'Please add a little more detail' } })}
        />
      </Field>
      <button type="submit" disabled={submitting} className="btn btn-ink btn-lg group w-full disabled:cursor-not-allowed disabled:opacity-70">
        {submitting ? (
          <>
            <Loader2 size={17} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send message <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
      <p className="text-center text-[12px] text-ink-400">We usually reply within 30 minutes. Your details stay private.</p>
    </form>
  )
}
