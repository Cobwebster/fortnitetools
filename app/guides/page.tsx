import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PostCard } from '@/components/post-card'
import { posts, categories } from '@/lib/posts'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Guides',
  description:
    'Chapter 7 Season 3 Fortnite guides — weapons tier list, shotgun loadouts, Shattered Coast drops, Battle Pass XP, and ranked climbing.',
  path: '/guides',
  keywords: ['fortnite guides', 'fortnite weapons', 'shattered coast', 'chapter 7 season 3'],
})

export default function GuidesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Guides
            </p>
            <h1 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-tight text-foreground sm:text-5xl text-balance">
              Fortnite Guides
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Season-specific guides only — current loot pool, Shattered Coast drops, Runners Battle Pass, and ranked climb habits.
            </p>
          </div>
        </section>

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

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} featured />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
