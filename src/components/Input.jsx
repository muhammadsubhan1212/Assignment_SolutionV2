import { forwardRef } from 'react'

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-ink-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full rounded-lg border bg-mist-50 px-3.5 py-2.5 text-sm text-ink-950 outline-none transition-all duration-200 placeholder:text-ink-400 ${
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
            : 'border-mist-200 focus:border-ink-400 focus:ring-2 focus:ring-mist-100'
        }`}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'
export default Input
