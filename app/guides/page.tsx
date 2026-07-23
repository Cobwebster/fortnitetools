import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PostCard } from '@/components/post-card'
import { posts, categories } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Fortnite Guides – Tips, Strategies & Tutorials',
  description:
    'Browse all Fortnite guides covering building, weapons, map locations, season updates, and advanced strategies. Find the tips you need to win.',
  openGraph: {
    title: 'Fortnite Guides – Tips, Strategies & Tutorials',
    description:
      'Browse all Fortnite guides covering building, weapons, map locations, season updates, and advanced strategies.',
  },
}

export default function GuidesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page header */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Resource Library
            </p>
            <h1 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-tight text-foreground sm:text-5xl text-balance">
              All Guides & Articles
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Everything you need to improve at Fortnite — from beginner building tips to advanced competitive strategies, weapon tier lists, and season guides.
            </p>
          </div>
        </section>

        {/* Category filter pills */}
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <nav aria-label="Filter by category">
              <ul className="flex flex-wrap gap-2" role="list">
                <li>
                  <Link
                    href="/guides"
                    className="rounded-full border border-primary bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                    aria-current="page"
                  >
                    All
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/guides/${cat.id}`}
                      className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted-foreground hover:border-primary/60 hover:text-primary transition-colors"
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {/* Posts grid */}
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} featured />
            ))}
          </div>

          {/* Category sections */}
          <div className="mt-16 space-y-14">
            {categories.map((cat) => {
              const catPosts = posts.filter((p) => p.category === cat.id)
              if (catPosts.length === 0) return null
              return (
                <section key={cat.id} aria-labelledby={`section-${cat.id}`}>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2
                        id={`section-${cat.id}`}
                        className="font-display text-xl font-bold uppercase tracking-tight text-foreground"
                      >
                        {cat.label}
                      </h2>
                      <p className="text-sm text-muted-foreground">{cat.description}</p>
                    </div>
                    <Link
                      href={`/guides/${cat.id}`}
                      className="flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80 transition-opacity shrink-0 ml-4"
                    >
                      View all <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {catPosts.map((post) => (
                      <PostCard key={post.slug} post={post} />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
