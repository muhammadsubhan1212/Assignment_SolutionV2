import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../utils/helpers'

const controlBase =
  'w-full px-4 py-3 text-[14.5px] bg-[#fbfaf7] border border-mist-200 rounded-xl text-ink-950 outline-none transition-all duration-200 placeholder:text-ink-300 hover:border-mist-300'

const controlState = (invalid) =>
  invalid
    ? 'border-red-300 bg-red-50/40 focus:border-red-500 focus:ring-4 focus:ring-red-100'
    : 'focus:border-brass-400 focus:bg-white focus:ring-4 focus:ring-brass-100/70'

export function Field({ label, error, hint, htmlFor, children, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className="mb-2 flex items-center justify-between text-[13px] font-semibold text-ink-800">
          {label}
          {hint && !error && <span className="text-[11.5px] font-medium text-ink-400">{hint}</span>}
        </label>
      )}
      {children}
      {error && <p className="mt-1.5 text-[12px] font-medium text-red-500">{error}</p>}
    </div>
  )
}

export const Input = forwardRef(({ invalid, className = '', ...props }, ref) => (
  <input ref={ref} aria-invalid={invalid || undefined} className={cn(controlBase, controlState(invalid), className)} {...props} />
))
Input.displayName = 'Input'

export const Textarea = forwardRef(({ invalid, className = '', ...props }, ref) => (
  <textarea ref={ref} aria-invalid={invalid || undefined} className={cn(controlBase, controlState(invalid), 'resize-y', className)} {...props} />
))
Textarea.displayName = 'Textarea'

export const Select = forwardRef(({ invalid, className = '', children, ...props }, ref) => (
  <div className="relative">
    <select ref={ref} className={cn(controlBase, controlState(invalid), 'cursor-pointer appearance-none pr-10', className)} {...props}>
      {children}
    </select>
    <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
  </div>
))
Select.displayName = 'Select'
