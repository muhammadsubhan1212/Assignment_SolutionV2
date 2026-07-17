import { forwardRef } from 'react'

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full px-3.5 py-2.5 text-sm bg-neutral-50 border rounded-xl outline-none transition-all duration-200 placeholder:text-neutral-400 ${
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
            : 'border-neutral-200 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100'
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
