import type { Metadata } from 'next'
import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PostCard } from '@/components/post-card'
import { categories, getPostsSorted } from '@/lib/posts'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Guides',
  description:
    'Chapter 7 Season 4 (Override) Fortnite guides — Admin Panel codes, Green Hill Zone, Battle Pass XP, Match Overrides, and Ranked Null. Older Runners articles stay dated until rewritten.',
  path: '/guides',
  keywords: [
    'fortnite guides',
    'fortnite override',
    'admin panel codes',
    'green hill zone',
    'chapter 7 season 4',
  ],
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
              Fresh Override write-ups first — Admin Panel codes, Battle Pass end date, Green Hill Zone,
              Match Overrides, and Ranked Null. Older Runners weapon and Sprite articles stay linked with
              last-reviewed dates until we rewrite the loot pool.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Start with the{' '}
              <Link href="/season" className="text-primary hover:underline">
                season hub
              </Link>{' '}
              or map drops if you want where to land. How-to covers refunds and codes. Tools (map, shop, loadout, build
              sim) sit next to these — they are not replacements for the write-ups.
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
            {getPostsSorted().map((post) => (
              <PostCard key={post.slug} post={post} featured />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
