import { forwardRef } from 'react'

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}, ref) => {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none'

  const variants = {
    primary: 'bg-ink-900 text-white hover:bg-ink-800',
    secondary: 'bg-white text-ink-900 border border-mist-200 hover:border-mist-300 hover:bg-mist-50',
    ghost: 'text-ink-600 hover:text-ink-900 hover:bg-mist-100',
    accent: 'bg-brass-400 text-ink-950 hover:bg-brass-300',
  }

  const sizes = {
    sm: 'px-3.5 py-2 text-sm rounded-lg',
    md: 'px-5 py-2.5 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-xl',
  }

  return (
    <button
      ref={ref}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'
export default Button
