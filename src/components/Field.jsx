import { forwardRef } from 'react'
import { cn } from '../utils/helpers'

const controlBase =
  'w-full px-3.5 py-2.5 text-sm bg-neutral-50 border rounded-xl outline-none transition-all duration-200 placeholder:text-neutral-400'

const controlState = (invalid) =>
  invalid
    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
    : 'border-neutral-200 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100'

export function Field({ label, error, hint, htmlFor, children, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-neutral-700 mb-1.5">
          {label}
        </label>
      )}
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-neutral-400">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}

export const Input = forwardRef(({ invalid, className = '', ...props }, ref) => (
  <input ref={ref} className={cn(controlBase, controlState(invalid), className)} {...props} />
))
Input.displayName = 'Input'

export const Textarea = forwardRef(({ invalid, className = '', ...props }, ref) => (
  <textarea ref={ref} className={cn(controlBase, controlState(invalid), 'resize-y', className)} {...props} />
))
Textarea.displayName = 'Textarea'

export const Select = forwardRef(({ invalid, className = '', children, ...props }, ref) => (
  <select ref={ref} className={cn(controlBase, controlState(invalid), 'cursor-pointer appearance-none pr-9', className)} {...props}>
    {children}
  </select>
))
Select.displayName = 'Select'
