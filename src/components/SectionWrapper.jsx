export default function SectionWrapper({ children, id, className = '' }) {
  return (
    <section id={id} className={`py-20 sm:py-24 lg:py-28 ${className}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {children}
      </div>
    </section>
  )
}
