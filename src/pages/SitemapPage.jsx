import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import { allServices } from '../data/brand'
import { img } from '../data/images'

const company = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about-us' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'Blog', path: '/blogs' },
  { label: 'Order Now', path: '/order-now' },
  { label: 'Contact Us', path: '/contact-us' },
  { label: 'Login', path: '/login' },
]

const legal = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms & Conditions', path: '/terms-and-conditions' },
  { label: 'Revision Policy', path: '/revision-policy' },
  { label: 'Refund Policy', path: '/refund-policy' },
]

function Group({ title, links }) {
  return (
    <div>
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-brass-600">{title}</p>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.path}>
            <Link to={l.path} className="font-heading text-[15px] font-medium text-ink-950 transition-colors hover:text-brass-600">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function SitemapPage() {
  return (
    <>
      <Seo title="Sitemap" description="Browse every Assignment Solution page — company, policies, and services." path="/sitemap" />
      <PageHeader
        eyebrow="Navigation"
        title="Sitemap"
        subtitle="Find what you need quickly."
        crumbs={[{ label: 'Sitemap' }]}
        image={img.planning}
      />

      <div className="bg-mist-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-4">
            <Group title="Company" links={company} />
            <Group title="Legal" links={legal} />
            <div className="lg:col-span-2">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-brass-600">Services</p>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {allServices.map((s) => (
                  <li key={s.path}>
                    <Link to={s.path} className="font-heading text-[15px] font-medium text-ink-950 transition-colors hover:text-brass-600">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
