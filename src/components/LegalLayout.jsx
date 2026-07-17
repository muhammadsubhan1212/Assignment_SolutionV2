import Seo from './Seo'
import PageHeader from './PageHeader'

export default function LegalLayout({ title, description, path, updated = 'July 2026', children }) {
  return (
    <>
      <Seo title={title} description={description} path={path} />
      <PageHeader eyebrow="Legal" title={title} crumbs={[{ label: title }]} />
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="mb-8 text-[12px] font-medium uppercase tracking-wide text-neutral-400">Last updated: {updated}</p>
        <div className="space-y-5 text-[15px] leading-[1.8] text-neutral-600">{children}</div>
      </section>
    </>
  )
}

export function LegalList({ items }) {
  return (
    <ul className="space-y-2.5 pl-1">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
