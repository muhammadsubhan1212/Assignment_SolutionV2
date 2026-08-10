import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Seo from '../components/Seo'
import { Field, Input } from '../components/Field'
import { useAuth } from '../context/AuthContext'
import { isValidEmail, getInitials } from '../utils/helpers'
import { img } from '../data/images'

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { login, isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const result = await login(values.email, values.password, values.remember)
      toast.success(result.message || 'Logged in successfully')
      navigate('/')
    } catch (err) {
      toast.error(err.message || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Seo title="Login" description="Sign in to your Assignment Solution account." path="/login" />

      <section className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
        {/* Photo panel */}
        <div className="relative flex min-h-[280px] flex-col justify-end overflow-hidden bg-ink-950 px-8 py-12 sm:px-12 lg:w-1/2 lg:min-h-0 lg:justify-center lg:px-16 lg:py-24">
          <img
            src={img.studentPhone}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/40 lg:bg-gradient-to-r lg:from-ink-950/30 lg:via-ink-950/55 lg:to-ink-950/80" />
          <div className="relative z-10 max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass-300">Account</p>
            <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Welcome back
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-white/65">
              Access your Assignment Solution dashboard and orders.
            </p>
          </div>
        </div>

        {/* Form panel */}
        <div className="flex flex-1 flex-col justify-center bg-mist-50 px-8 py-14 sm:px-12 lg:w-1/2 lg:px-16 lg:py-24">
          <div className="mx-auto w-full max-w-md border border-mist-200 bg-white p-6 sm:p-8">
            {isAuthenticated ? (
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center bg-ink-950 text-sm font-bold text-brass-300">
                  {getInitials(user?.name || user?.email || '?') || '?'}
                </div>
                <h2 className="font-heading text-xl font-semibold tracking-tight text-ink-950">You&apos;re signed in</h2>
                <p className="text-[14px] text-ink-600">Welcome back, {user?.name || user?.email}.</p>
                <div className="flex justify-center gap-2 pt-1">
                  <Link to="/order-now" className="rounded-lg bg-ink-950 px-5 py-2.5 text-sm font-medium text-white hover:bg-ink-800">
                    Place an order
                  </Link>
                  <button onClick={logout} className="rounded-lg border border-mist-300 px-5 py-2.5 text-sm font-medium text-ink-700 hover:border-ink-400">
                    Log out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="font-heading text-xl font-semibold tracking-tight text-ink-950">Sign in</h2>
                <p className="mt-1.5 text-[13px] text-ink-600">Use your email and password to continue.</p>
                <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                  <Field label="Email" error={errors.email?.message} htmlFor="login-email">
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      invalid={!!errors.email}
                      {...register('email', { required: 'Email is required', validate: (v) => isValidEmail(v) || 'Enter a valid email' })}
                    />
                  </Field>
                  <Field label="Password" error={errors.password?.message} htmlFor="login-password">
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      invalid={!!errors.password}
                      {...register('password', { required: 'Password is required', minLength: { value: 4, message: 'Minimum 4 characters' } })}
                    />
                  </Field>
                  <label className="flex items-center gap-2 text-[13px] text-ink-600">
                    <input type="checkbox" defaultChecked className="h-3.5 w-3.5 rounded border-mist-300 text-ink-950" {...register('remember')} />
                    Remember me on this device
                  </label>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-lg bg-ink-950 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink-800 disabled:opacity-60"
                  >
                    {submitting ? 'Signing in…' : 'Sign in'}
                  </button>
                </form>
                <p className="mt-5 text-center text-[11px] text-ink-400">Demo auth accepts any email and password.</p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
