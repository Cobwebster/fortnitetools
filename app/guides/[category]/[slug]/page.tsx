import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, Tag, ArrowLeft, ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PostCard } from '@/components/post-card'
import { posts, getPostBySlug, getCategoryLabel, formatDate, type Category } from '@/lib/posts'

interface Props {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug, category } = await params
  const post = getPostBySlug(slug)
  if (!post || post.category !== category) notFound()

  const relatedPosts = posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2)

  const otherPosts = posts.filter((p) => p.slug !== post.slug && p.category !== post.category).slice(0, 2)
  const recommended = [...relatedPosts, ...otherPosts].slice(0, 2)

  const postIndex = posts.findIndex((p) => p.slug === post.slug)
  const prevPost = posts[postIndex - 1]
  const nextPost = posts[postIndex + 1]

  return (
    <>
      <Navbar />
      <main>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground" role="list">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/guides" className="hover:text-primary transition-colors">Guides</Link></li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/guides/${post.category}`} className="hover:text-primary transition-colors">
                  {getCategoryLabel(post.category as Category)}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="truncate text-foreground font-medium max-w-[200px]">{post.title}</li>
            </ol>
          </div>
        </nav>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Main article */}
            <article className="lg:col-span-2" itemScope itemType="https://schema.org/Article">
              {/* Hero image */}
              <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  itemProp="image"
                />
              </div>

              {/* Article header */}
              <header className="mt-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={`/guides/${post.category}`}
                    className="rounded bg-primary/10 border border-primary/30 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary hover:bg-primary/20 transition-colors"
                  >
                    {getCategoryLabel(post.category as Category)}
                  </Link>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {post.readTime} min read
                  </span>
                </div>
                <h1
                  className="mt-3 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-foreground sm:text-4xl text-balance"
                  itemProp="headline"
                >
                  {post.title}
                </h1>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground" itemProp="description">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <time dateTime={post.date} itemProp="datePublished">{formatDate(post.date)}</time>
                  <span itemProp="author" itemScope itemType="https://schema.org/Organization">
                    <span itemProp="name">FortniteTools.com</span>
                  </span>
                </div>
              </header>

              {/* Article content */}
              <div className="mt-8 prose prose-invert prose-lg max-w-none" itemProp="articleBody">
                {post.content ? (
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    {post.content.trim().split('\n\n').map((block, i) => {
                      if (block.startsWith('## ')) {
                        return (
                          <h2 key={i} className="font-display text-2xl font-bold uppercase text-foreground mt-8 mb-3">
                            {block.replace('## ', '')}
                          </h2>
                        )
                      }
                      if (block.startsWith('### ')) {
                        return (
                          <h3 key={i} className="font-display text-xl font-bold uppercase text-foreground mt-6 mb-2">
                            {block.replace('### ', '')}
                          </h3>
                        )
                      }
                      if (block.startsWith('- ') || block.includes('\n- ')) {
                        const items = block.split('\n').filter((l) => l.startsWith('- '))
                        return (
                          <ul key={i} className="list-disc pl-5 space-y-1">
                            {items.map((item, j) => (
                              <li key={j} className="text-muted-foreground"
                                dangerouslySetInnerHTML={{ __html: item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }}
                              />
                            ))}
                          </ul>
                        )
                      }
                      if (block.match(/^\d+\./)) {
                        const items = block.split('\n').filter((l) => l.match(/^\d+\./))
                        return (
                          <ol key={i} className="list-decimal pl-5 space-y-1">
                            {items.map((item, j) => (
                              <li key={j} className="text-muted-foreground"
                                dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }}
                              />
                            ))}
                          </ol>
                        )
                      }
                      return (
                        <p key={i}
                          dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }}
                        />
                      )
                    })}
                  </div>
                ) : (
                  <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
                    <p className="text-muted-foreground">Full article coming soon. Check back shortly!</p>
                  </div>
                )}
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-0.5 text-xs text-muted-foreground capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Prev / Next navigation */}
              <nav
                aria-label="Article navigation"
                className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-8"
              >
                {prevPost ? (
                  <Link
                    href={`/guides/${prevPost.category}/${prevPost.slug}`}
                    className="group flex flex-col gap-1 rounded-lg border border-border p-4 hover:border-primary/50 transition-colors"
                  >
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Previous
                    </span>
                    <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {prevPost.title}
                    </span>
                  </Link>
                ) : <div />}
                {nextPost ? (
                  <Link
                    href={`/guides/${nextPost.category}/${nextPost.slug}`}
                    className="group flex flex-col items-end gap-1 rounded-lg border border-border p-4 hover:border-primary/50 transition-colors text-right"
                  >
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      Next <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {nextPost.title}
                    </span>
                  </Link>
                ) : <div />}
              </nav>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Related posts */}
              {recommended.length > 0 && (
                <section aria-labelledby="related-heading">
                  <h2
                    id="related-heading"
                    className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-4"
                  >
                    You May Also Like
                  </h2>
                  <div className="flex flex-col gap-3">
                    {recommended.map((p) => (
                      <PostCard key={p.slug} post={p} />
                    ))}
                  </div>
                </section>
              )}

              {/* Browse categories */}
              <section aria-labelledby="categories-sidebar-heading">
                <h2
                  id="categories-sidebar-heading"
                  className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-4"
                >
                  Browse Categories
                </h2>
                <nav>
                  <ul className="flex flex-col gap-2" role="list">
                    {['guides', 'weapons', 'building', 'season', 'map', 'tools'].map((cat) => (
                      <li key={cat}>
                        <Link
                          href={`/guides/${cat}`}
                          className="block rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium capitalize text-muted-foreground hover:border-primary/60 hover:text-primary transition-colors"
                        >
                          {cat.charAt(0).toUpperCase() + cat.slice(1)} Guides
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </section>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
