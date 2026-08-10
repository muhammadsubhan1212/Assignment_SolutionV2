export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brass-600 ${className}`}
    >
      <span className="h-1.5 w-1.5 bg-brass-500" />
      {children}
    </span>
  )
}
