import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import { blogPosts } from '../data/blogs'
import { formatDate } from '../utils/helpers'
import { img } from '../data/images'

const blogPhotos = [
  img.woodDesk,
  img.studentReading2,
  img.bookLaptop,
  img.organized,
  img.workspace,
  img.studentPlanning,
]

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
        image={img.studentReading}
      />

      <div className="bg-mist-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          {/* Featured */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              to={`/blogs/${featured.slug}`}
              className="group grid overflow-hidden border border-mist-200 bg-ink-950 lg:grid-cols-2"
            >
              <div className="relative min-h-[240px] overflow-hidden">
                <img
                  src={blogPhotos[0]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink-950/55" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass-300">
                    {featured.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <div className="flex items-center gap-2 text-[12px] text-white/45">
                  <span>{formatDate(featured.date)}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
                <h2 className="mt-3 font-heading text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/55">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brass-300">
                  Read article
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Rest */}
          {rest.length > 0 && (
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {rest.map((post, i) => {
                const photo = blogPhotos[(i + 1) % blogPhotos.length]
                return (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                  >
                    <Link to={`/blogs/${post.slug}`} className="group block overflow-hidden border border-mist-200 bg-white">
                      <div className="relative aspect-[16/9] overflow-hidden bg-ink-900">
                        <img
                          src={photo}
                          alt=""
                          loading="lazy"
                          className="img-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brass-600">{post.category}</span>
                        <h3 className="mt-2 font-heading text-xl font-semibold leading-tight tracking-tight text-ink-950">
                          {post.title}
                        </h3>
                        <p className="mt-2.5 line-clamp-2 text-[14px] leading-relaxed text-ink-600">{post.excerpt}</p>
                        <div className="mt-5 flex items-center gap-2 border-t border-mist-200 pt-4 text-[12px] text-ink-500">
                          <span>{formatDate(post.date)}</span>
                          <span>·</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
