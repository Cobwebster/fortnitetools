import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PostCard } from '@/components/post-card'
import { categories, getPostsByCategory, type Category } from '@/lib/posts'

interface Props {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = categories.find((c) => c.id === category)
  if (!cat) return {}
  return {
    title: `Fortnite ${cat.label} Guides – Tips & Strategies`,
    description: cat.description + ` Browse all Fortnite ${cat.label.toLowerCase()} guides on FortniteTools.com.`,
    openGraph: {
      title: `Fortnite ${cat.label} Guides`,
      description: cat.description,
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = categories.find((c) => c.id === category)
  if (!cat) notFound()

  const catPosts = getPostsByCategory(category as Category)

  return (
    <>
      <Navbar />
      <main>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="border-b border-border bg-card"
        >
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground" role="list">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/guides" className="hover:text-primary transition-colors">
                  Guides
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground font-medium">{cat.label}</li>
            </ol>
          </div>
        </nav>

        {/* Page header */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Category</p>
            <h1 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-tight text-foreground sm:text-5xl text-balance">
              Fortnite {cat.label} Guides
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {cat.description}
            </p>
          </div>
        </section>

        {/* Category pills */}
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <nav aria-label="Filter by category">
              <ul className="flex flex-wrap gap-2" role="list">
                <li>
                  <Link
                    href="/guides"
                    className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted-foreground hover:border-primary/60 hover:text-primary transition-colors"
                  >
                    All
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/guides/${c.id}`}
                      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                        c.id === category
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border text-muted-foreground hover:border-primary/60 hover:text-primary'
                      }`}
                      aria-current={c.id === category ? 'page' : undefined}
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {/* Posts */}
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {catPosts.length === 0 ? (
            <div className="rounded-lg border border-border bg-card p-12 text-center">
              <p className="text-muted-foreground">No guides in this category yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {catPosts.map((post) => (
                <PostCard key={post.slug} post={post} featured />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
