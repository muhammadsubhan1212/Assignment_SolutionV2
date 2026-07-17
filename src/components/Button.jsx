import { forwardRef } from 'react'

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}, ref) => {
  const base = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-xl cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none'

  const variants = {
    primary: 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm shadow-neutral-900/10',
    secondary: 'bg-white text-neutral-900 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 shadow-sm',
    ghost: 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100',
    accent: 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm shadow-violet-600/20',
  }

  const sizes = {
    sm: 'px-3.5 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'
export default Button
