import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import { blogPosts } from '../data/blogs'
import { formatDate } from '../utils/helpers'

export default function BlogsPage() {
  const [featured, ...rest] = blogPosts

  return (
    <>
      <Seo
        title="Blog"
        description="Study strategies, referencing guides, and academic writing tips from the Assignment Solution editorial team."
        path="/blogs"
      />
      <PageHeader
        eyebrow="Insights"
        title="The Assignment Solution blog"
        subtitle="Practical guidance on writing, referencing, and staying calm through deadline season."
        crumbs={[{ label: 'Blog' }]}
      />

      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Featured */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link
            to={`/blogs/${featured.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-neutral-200/80 bg-neutral-900 lg:grid-cols-2"
          >
            <div className="relative min-h-[220px] overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-700 p-8">
              <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
              <span className="relative text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                {featured.category}
              </span>
              <p className="relative mt-40 font-heading text-5xl font-bold tracking-tighter text-white/20">{featured.readTime}</p>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <div className="flex items-center gap-2 text-[12px] text-neutral-400">
                <span>{formatDate(featured.date)}</span>
                <span>·</span>
                <span>{featured.readTime}</span>
              </div>
              <h2 className="mt-3 font-heading text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-neutral-400">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                Read article
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Rest */}
        {rest.length > 0 && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <Link
                  to={`/blogs/${post.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-neutral-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(0,0,0,0.14)]"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-600">{post.category}</span>
                  <h3 className="mt-3 font-heading text-xl font-bold leading-tight tracking-tight text-neutral-900">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-neutral-500">{post.excerpt}</p>
                  <div className="mt-5 flex items-center gap-2 border-t border-neutral-100 pt-4 text-[12px] text-neutral-400">
                    <span>{formatDate(post.date)}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
