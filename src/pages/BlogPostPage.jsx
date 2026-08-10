import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import OrderCTA from '../components/OrderCTA'
import { getPostBySlug, blogPosts } from '../data/blogs'
import { formatDate } from '../utils/helpers'
import { img } from '../data/images'

const relatedPhotos = [img.woodDesk, img.bookLaptop, img.organized, img.studentReading]

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <section className="mx-auto max-w-6xl px-5 py-32 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-wider text-brass-600">Not found</p>
        <h1 className="mt-2 font-heading text-3xl font-extrabold text-ink-950">Article not found</h1>
        <Link to="/blogs" className="mt-7 inline-block rounded-lg bg-ink-950 px-6 py-3 text-sm font-medium text-white hover:bg-ink-800">
          Back to blog
        </Link>
      </section>
    )
  }

  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <Seo title={post.title} description={post.excerpt} path={`/blogs/${post.slug}`} />
      <PageHeader
        eyebrow={post.category}
        title={post.title}
        crumbs={[{ label: 'Blog', path: '/blogs' }, { label: post.title }]}
        image={img.studentReading2}
      />

      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-wrap items-center gap-3 text-[13px] text-ink-500">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brass-600">{post.category}</span>
          <span className="text-mist-300">·</span>
          <span className="font-medium text-ink-800">{post.author}</span>
          <span>·</span>
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        <div className="mt-8 space-y-5">
          {post.content.map((para, i) => (
            <p key={i} className="text-[16px] leading-[1.8] text-ink-700">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-12 border-t border-mist-200 pt-8">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-sm font-medium text-ink-600 transition-colors hover:text-ink-950">
            <ArrowLeft size={15} /> Back to all articles
          </Link>
        </div>
      </article>

      {more.length > 0 && (
        <section className="border-t border-mist-200 bg-mist-50 py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <h2 className="mb-6 font-heading text-xl font-semibold tracking-tight text-ink-950">Keep reading</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {more.map((p, i) => (
                <Link
                  key={p.slug}
                  to={`/blogs/${p.slug}`}
                  className="group overflow-hidden border border-mist-200 bg-white transition-all hover:border-mist-300"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-ink-900">
                    <img
                      src={relatedPhotos[i % relatedPhotos.length]}
                      alt=""
                      loading="lazy"
                      className="img-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-3 p-6">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brass-600">{p.category}</span>
                      <h3 className="mt-2 font-heading text-base font-semibold leading-tight text-ink-950">{p.title}</h3>
                    </div>
                    <ArrowUpRight size={16} className="mt-1 shrink-0 text-ink-300 transition-colors group-hover:text-brass-600" />
                  </div>
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
