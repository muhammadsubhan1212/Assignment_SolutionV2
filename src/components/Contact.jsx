import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import toast from 'react-hot-toast'
import { submitContact } from '../services/fareService'
import { brand } from '../data/brand'
import { img } from '../data/images'

function FloatingField({ label, id, type = 'text', register, error, registerOptions }) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  const { onChange: regOnChange, ...restRegister } = register(id, registerOptions)

  return (
    <div className="relative pt-5">
      <motion.label
        htmlFor={id}
        className="absolute left-0 text-ink-400 pointer-events-none origin-left"
        animate={{
          y: focused || hasValue ? -20 : 0,
          scale: focused || hasValue ? 0.8 : 1,
          color: focused ? '#152536' : '#9aaba2',
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      <input
        id={id}
        type={type}
        className="w-full bg-transparent border-b border-mist-200 pb-2 pt-0 text-ink-950 focus:outline-none focus:border-ink-950 transition-colors duration-300"
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          setHasValue(e.target.value.length > 0)
        }}
        onChange={(e) => {
          regOnChange(e)
          setHasValue(e.target.value.length > 0)
        }}
        {...restRegister}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error.message}</p>
      )}
    </div>
  )
}

function FloatingTextarea({ label, id, register, error, registerOptions }) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  const { onChange: regOnChange, ...restRegister } = register(id, registerOptions)

  return (
    <div className="relative pt-5">
      <motion.label
        htmlFor={id}
        className="absolute left-0 top-5 text-ink-400 pointer-events-none origin-left"
        animate={{
          y: focused || hasValue ? -20 : 0,
          scale: focused || hasValue ? 0.8 : 1,
          color: focused ? '#152536' : '#9aaba2',
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      <textarea
        id={id}
        rows={4}
        className="w-full bg-transparent border-b border-mist-200 pb-2 pt-0 text-ink-950 focus:outline-none focus:border-ink-950 transition-colors duration-300 resize-none"
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          setHasValue(e.target.value.length > 0)
        }}
        onChange={(e) => {
          regOnChange(e)
          setHasValue(e.target.value.length > 0)
        }}
        {...restRegister}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error.message}</p>
      )}
    </div>
  )
}

function FloatingSelect({ label, id, options, register, error, registerOptions }) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  const { onChange: regOnChange, ...restRegister } = register(id, registerOptions)

  return (
    <div className="relative pt-5">
      <motion.label
        htmlFor={id}
        className="absolute left-0 text-ink-400 pointer-events-none origin-left"
        animate={{
          y: focused || hasValue ? -20 : 0,
          scale: focused || hasValue ? 0.8 : 1,
          color: focused ? '#152536' : '#9aaba2',
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      <select
        id={id}
        className="w-full bg-transparent border-b border-mist-200 pb-2 pt-0 text-ink-950 focus:outline-none focus:border-ink-950 transition-colors duration-300 appearance-none cursor-pointer"
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          setHasValue(e.target.value.length > 0)
        }}
        onChange={(e) => {
          regOnChange(e)
          setHasValue(e.target.value.length > 0)
        }}
        {...restRegister}
        defaultValue=""
      >
        <option value="" disabled hidden></option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error.message}</p>
      )}
    </div>
  )
}

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const result = await submitContact({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        detail: data.message,
      })
      if (!result.success) {
        toast.error(result.message)
        return
      }
      toast.success(result.message)
      reset()
    } catch (error) {
      toast.error(error.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const subjectOptions = [
    { value: 'essay', label: 'Essay' },
    { value: 'dissertation', label: 'Dissertation' },
    { value: 'programming', label: 'Programming' },
    { value: 'other', label: 'Other' },
  ]

  return (
    <section id="contact" ref={ref} className="min-h-screen flex flex-col lg:flex-row">
      {/* Left panel */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="lg:w-[40%] relative overflow-hidden px-8 sm:px-12 lg:px-16 py-16 lg:py-24 flex flex-col justify-center bg-ink-950"
      >
        <img
          src={img.consultantOnline}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink-950/80" />
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6 font-heading">
            Let's talk about<br />your project
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-12">
            Share your requirements and we'll match you with the perfect expert for your assignment.
          </p>

          <div className="space-y-6">
            <div>
              <p className="text-brass-300/70 text-xs uppercase tracking-widest mb-1">Email</p>
              <p className="text-white text-base">{brand.email}</p>
            </div>
            <div>
              <p className="text-brass-300/70 text-xs uppercase tracking-widest mb-1">Phone</p>
              <p className="text-white text-base">{brand.phone}</p>
              <p className="text-white text-base">{brand.phone2}</p>
            </div>
            <div>
              <p className="text-brass-300/70 text-xs uppercase tracking-widest mb-1">Hours</p>
              <p className="text-white text-base">24/7 — Always available</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right panel — Form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="lg:w-[60%] bg-white px-8 sm:px-12 lg:px-20 py-16 lg:py-24 flex flex-col justify-center"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg" noValidate>
          <div className="space-y-8">
            <FloatingField
              label="Your name"
              id="name"
              register={register}
              error={errors.name}
              registerOptions={{ required: 'Name is required' }}
            />

            <FloatingField
              label="Email address"
              id="email"
              type="email"
              register={register}
              error={errors.email}
              registerOptions={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              }}
            />

            <FloatingSelect
              label="Subject"
              id="subject"
              options={subjectOptions}
              register={register}
              error={errors.subject}
              registerOptions={{}}
            />

            <FloatingTextarea
              label="Your message"
              id="message"
              register={register}
              error={errors.message}
              registerOptions={{
                required: 'Message is required',
                minLength: {
                  value: 10,
                  message: 'Message must be at least 10 characters',
                },
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="mt-10 w-full bg-ink-950 text-white py-4 text-sm tracking-wide uppercase font-semibold relative overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ink-800"
          >
            <span className="inline-flex items-center gap-2 transition-transform duration-300">
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <motion.span
                animate={{ x: isHovered && !isSubmitting ? 0 : -10, opacity: isHovered && !isSubmitting ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                &rarr;
              </motion.span>
            </span>
          </button>

          <p className="mt-4 text-xs text-ink-400 text-center">
            We respond within 30 minutes
          </p>
        </form>
      </motion.div>
    </section>
  )
}
