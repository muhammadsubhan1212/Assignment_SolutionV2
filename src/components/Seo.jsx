import { useEffect } from 'react'
import { brand } from '../data/brand'

export default function Seo({
  title,
  description = 'Assignment Solution helps university students worldwide deliver clear, original academic writing with confident deadlines.',
  path = '/',
  keywords = 'academic writing, assignment help, thesis help, essay writing, assignment solution, UK, USA, Australia',
}) {
  const fullTitle = title ? `${title} | ${brand.name}` : `${brand.name} — ${brand.tagline}`

  useEffect(() => {
    document.title = fullTitle

    const setMeta = (name, content, property = false) => {
      const attr = property ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', description)
    setMeta('keywords', keywords)
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', description, true)
    setMeta('og:type', 'website', true)
    setMeta('og:url', `https://${brand.domain}${path}`, true)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
  }, [fullTitle, description, path, keywords])

  return null
}
