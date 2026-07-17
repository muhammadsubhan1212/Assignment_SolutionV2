export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase text-neutral-500 ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
      {children}
    </span>
  )
}
