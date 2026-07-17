import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import OrderCTA from '../components/OrderCTA'
import { getPostBySlug, blogPosts } from '../data/blogs'
import { formatDate } from '../utils/helpers'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <section className="mx-auto max-w-6xl px-5 py-32 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-wider text-violet-600">Not found</p>
        <h1 className="mt-2 font-heading text-3xl font-extrabold text-neutral-900">Article not found</h1>
        <Link to="/blogs" className="mt-7 inline-block rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800">
          Back to blog
        </Link>
      </section>
    )
  }

  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <Seo title={post.title} description={post.excerpt} path={`/blogs/${post.slug}`} />
      <PageHeader eyebrow={post.category} title={post.title} crumbs={[{ label: 'Blog', path: '/blogs' }, { label: post.title }]} />

      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex items-center gap-3 text-[13px] text-neutral-400">
          <span className="font-medium text-neutral-700">{post.author}</span>
          <span>·</span>
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        <div className="mt-8 space-y-5">
          {post.content.map((para, i) => (
            <p key={i} className="text-[16px] leading-[1.8] text-neutral-700">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-12 border-t border-neutral-100 pt-8">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900">
            <ArrowLeft size={15} /> Back to all articles
          </Link>
        </div>
      </article>

      {more.length > 0 && (
        <section className="border-t border-neutral-100 bg-[#faf9f7] py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-xl font-bold tracking-tight text-neutral-900">Keep reading</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {more.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blogs/${p.slug}`}
                  className="group flex items-start justify-between gap-3 rounded-2xl border border-neutral-200/80 bg-white p-6 transition-all hover:border-neutral-300 hover:shadow-sm"
                >
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-600">{p.category}</span>
                    <h3 className="mt-2 font-heading text-base font-bold leading-tight text-neutral-900">{p.title}</h3>
                  </div>
                  <ArrowUpRight size={16} className="mt-1 shrink-0 text-neutral-300 transition-colors group-hover:text-neutral-900" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <OrderCTA />
    </>
  )
}
