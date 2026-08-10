import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { ArrowRight, ShieldCheck, Clock, RefreshCw } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import { Field, Input, Select, Textarea } from '../components/Field'
import { useFare } from '../hooks/useFare'
import { useCurrency } from '../context/CurrencyContext'
import { submitOrder } from '../services/fareService'
import { isValidEmail } from '../utils/helpers'
import {
  paperTypes,
  academicLevels,
  deadlines,
  wordOptions,
  WORDS_PER_PAGE,
  referenceStyles,
  subjectGroups,
  countryList,
} from '../data/orderOptions'
import { img } from '../data/images'

const trustItems = [
  { icon: ShieldCheck, text: 'Plagiarism report included' },
  { icon: RefreshCw, text: 'Free revisions in window' },
  { icon: Clock, text: 'On-time delivery, always' },
]

export default function OrderNowPage() {
  const [submitting, setSubmitting] = useState(false)
  const { formatPrice, currencyCode } = useCurrency()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      country: 'United Kingdom',
      paperType: paperTypes[0],
      academicLevel: 1,
      subject: 'Business',
      deadline: 1,
      words: 1250,
      referenceStyle: 'Harvard',
      paperTopic: '',
      instructions: '',
    },
  })

  const levelId = Number(watch('academicLevel'))
  const deadlineId = Number(watch('deadline'))
  const words = Number(watch('words'))
  const paperType = watch('paperType')
  const quote = useFare(levelId, deadlineId, words, paperType, 'words')
  const { total, writingGross, deskFee, volumeSaved, urgencyFee, pages, loading } = quote

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const result = await submitOrder({
        ...values,
        pages: values.words / WORDS_PER_PAGE,
        amountUSD: total.toFixed(2),
        currency: currencyCode,
      })
      if (!result.success) {
        toast.error(result.message)
        return
      }
      toast.success(result.message)
      reset()
    } catch {
      toast.error('Unable to place order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Seo
        title="Order Now"
        description="Place an academic writing order with Assignment Solution. Instant pricing in your local currency, subject-matched writers, and free revisions."
        path="/order-now"
      />
      <PageHeader
        eyebrow="Place an order"
        title="Tell us about your project"
        subtitle="Fill in the brief and watch your quote update live. You only pay 50% to begin — the balance when your draft is ready."
        crumbs={[{ label: 'Order Now' }]}
        image={img.orderLaptop2}
      />

      <div className="bg-mist-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start lg:gap-10" noValidate>
            {/* Form */}
            <div className="space-y-8">
              <fieldset className="border border-mist-200 bg-white p-6 sm:p-8">
                <legend className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brass-600">
                  Assignment details
                </legend>
                <div className="mt-4 grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Paper type" htmlFor="paperType">
                      <Select id="paperType" {...register('paperType')}>
                        {paperTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </Select>
                    </Field>
                    <Field label="Academic level" htmlFor="academicLevel">
                      <Select id="academicLevel" {...register('academicLevel')}>
                        {academicLevels.map((l) => (
                          <option key={l.id} value={l.id}>{l.label}</option>
                        ))}
                      </Select>
                    </Field>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Subject" htmlFor="subject">
                      <Select id="subject" {...register('subject')}>
                        {subjectGroups.map((g) => (
                          <optgroup key={g.label} label={g.label}>
                            {g.options.map((o) => (
                              <option key={o} value={o}>{o}</option>
                            ))}
                          </optgroup>
                        ))}
                      </Select>
                    </Field>
                    <Field label="Referencing style" htmlFor="referenceStyle">
                      <Select id="referenceStyle" {...register('referenceStyle')}>
                        {referenceStyles.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </Select>
                    </Field>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Deadline" htmlFor="deadline">
                      <Select id="deadline" {...register('deadline')}>
                        {deadlines.map((d) => (
                          <option key={d.id} value={d.id}>{d.label}</option>
                        ))}
                      </Select>
                    </Field>
                    <Field label="Length (words)" htmlFor="words">
                      <Select id="words" {...register('words')}>
                        {wordOptions.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </Select>
                    </Field>
                  </div>
                  <Field label="Topic / title" error={errors.paperTopic?.message} htmlFor="paperTopic">
                    <Input
                      id="paperTopic"
                      placeholder="e.g. The impact of remote work on team productivity"
                      invalid={!!errors.paperTopic}
                      {...register('paperTopic', { required: 'Please add a topic or title' })}
                    />
                  </Field>
                  <Field label="Instructions" hint="Add rubric notes, sources, or formatting requirements." htmlFor="instructions">
                    <Textarea id="instructions" rows={5} placeholder="Share everything the writer should know…" {...register('instructions')} />
                  </Field>
                </div>
              </fieldset>

              <fieldset className="border border-mist-200 bg-white p-6 sm:p-8">
                <legend className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brass-600">
                  Your contact details
                </legend>
                <div className="mt-4 grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" error={errors.name?.message} htmlFor="name">
                      <Input id="name" invalid={!!errors.name} {...register('name', { required: 'Name is required' })} />
                    </Field>
                    <Field label="Email" error={errors.email?.message} htmlFor="email">
                      <Input
                        id="email"
                        type="email"
                        invalid={!!errors.email}
                        {...register('email', {
                          required: 'Email is required',
                          validate: (v) => isValidEmail(v) || 'Enter a valid email',
                        })}
                      />
                    </Field>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Phone" error={errors.phone?.message} htmlFor="phone">
                      <Input id="phone" type="tel" placeholder="+44 …" invalid={!!errors.phone} {...register('phone', { required: 'Phone is required' })} />
                    </Field>
                    <Field label="Country" htmlFor="country">
                      <Select id="country" {...register('country')}>
                        {countryList.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </Select>
                    </Field>
                  </div>
                </div>
              </fieldset>
            </div>

            {/* Sticky summary */}
            <aside className="lg:sticky lg:top-24">
              <div className="overflow-hidden border border-mist-200 bg-ink-950 shadow-[0_24px_60px_-24px_rgba(21,37,54,0.35)]">
                <div className="border-b border-white/10 px-6 py-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass-300">Quote</p>
                  <h2 className="mt-1 font-heading text-lg font-bold tracking-tight text-white">Order summary</h2>
                  <p className="mt-1 text-[13px] text-white/50">Live estimate as you build your brief.</p>
                </div>
                <div className="space-y-3 px-6 py-5 text-sm">
                  <Row label="Type" value={paperType} />
                  <Row label="Length" value={`${Number(words).toLocaleString()} words · ${pages} pages`} />
                  <Row label="Level" value={academicLevels.find((l) => l.id === levelId)?.label} />
                  <Row label="Deadline" value={deadlines.find((d) => d.id === deadlineId)?.label} />
                  <div className="my-1 border-t border-white/10" />
                  <Row label={`Writing (${formatPrice(quote.ratePer100)}/100 words)`} value={loading ? '…' : formatPrice(writingGross)} />
                  {volumeSaved > 0 && <Row label="Volume adjustment" value={`−${formatPrice(volumeSaved)}`} />}
                  <Row label="Desk & QA" value={loading ? '…' : formatPrice(deskFee)} />
                  {urgencyFee > 0 && <Row label="Urgency" value={`+${formatPrice(urgencyFee)}`} />}
                  <div className="mt-4 flex items-baseline justify-between border-t border-white/10 pt-4">
                    <span className="text-[13px] font-medium text-white/50">Estimated total</span>
                    <motion.span
                      key={loading ? 'l' : total}
                      initial={{ opacity: 0.4, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-heading text-2xl font-bold tabular-nums tracking-tight text-brass-300"
                    >
                      {loading ? '—' : formatPrice(total)}
                    </motion.span>
                  </div>
                  {currencyCode !== 'USD' && !loading && (
                    <p className="text-[11px] text-white/35">≈ ${total.toFixed(2)} USD · payment processed in USD.</p>
                  )}
                </div>
                <div className="px-6 pb-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brass-400 px-6 py-3.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-brass-300 disabled:opacity-60"
                  >
                    {submitting ? 'Placing order…' : 'Place order'}
                    {!submitting && <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />}
                  </button>
                  <div className="mt-5 space-y-2.5">
                    {trustItems.map((t) => {
                      const Icon = t.icon
                      return (
                        <div key={t.text} className="flex items-center gap-2.5 text-[12.5px] text-white/55">
                          <Icon size={14} className="text-brass-400" /> {t.text}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </aside>
          </form>
        </div>
      </div>
    </>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-white/50">{label}</span>
      <span className="text-right font-medium text-white/90">{value}</span>
    </div>
  )
}
