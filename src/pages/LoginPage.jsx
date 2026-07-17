import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import { Field, Input } from '../components/Field'
import { useAuth } from '../context/AuthContext'
import { isValidEmail, getInitials } from '../utils/helpers'

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
      <PageHeader eyebrow="Account" title="Welcome back" subtitle="Access your Assignment Solution dashboard and orders." crumbs={[{ label: 'Login' }]} align="center" />

      <section className="mx-auto flex max-w-6xl justify-center px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="w-full max-w-md rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.14)] sm:p-8">
          {isAuthenticated ? (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-sm font-bold text-white">
                {getInitials(user?.name || user?.email || '?') || '?'}
              </div>
              <h2 className="font-heading text-xl font-bold tracking-tight text-neutral-900">You&apos;re signed in</h2>
              <p className="text-[14px] text-neutral-500">Welcome back, {user?.name || user?.email}.</p>
              <div className="flex justify-center gap-2 pt-1">
                <Link to="/order-now" className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800">
                  Place an order
                </Link>
                <button onClick={logout} className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:border-neutral-300">
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="font-heading text-xl font-bold tracking-tight text-neutral-900">Sign in</h2>
              <p className="mt-1.5 text-[13px] text-neutral-500">Use your email and password to continue.</p>
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
                <label className="flex items-center gap-2 text-[13px] text-neutral-500">
                  <input type="checkbox" defaultChecked className="h-3.5 w-3.5 rounded border-neutral-300 text-neutral-900" {...register('remember')} />
                  Remember me on this device
                </label>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-60"
                >
                  {submitting ? 'Signing in…' : 'Sign in'}
                </button>
              </form>
              <p className="mt-5 text-center text-[11px] text-neutral-400">Demo auth accepts any email and password.</p>
            </>
          )}
        </div>
      </section>
    </>
  )
}
