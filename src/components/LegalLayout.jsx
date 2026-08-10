import Seo from './Seo'
import PageHeader from './PageHeader'
import { img } from '../data/images'

export default function LegalLayout({ title, description, path, updated = 'July 2026', children }) {
  return (
    <>
      <Seo title={title} description={description} path={path} />
      <PageHeader eyebrow="Legal" title={title} crumbs={[{ label: title }]} image={img.organized} />
      <section className="bg-mist-50">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="mb-8 text-[12px] font-medium uppercase tracking-wide text-brass-600">Last updated: {updated}</p>
          <div className="space-y-5 text-[15px] leading-[1.8] text-ink-600">{children}</div>
        </div>
      </section>
    </>
  )
}

export function LegalList({ items }) {
  return (
    <ul className="space-y-2.5 pl-1">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-brass-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
