import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Shield, Sword, Map, Star, Wrench, BookOpen } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PostCard } from '@/components/post-card'
import { posts, categories, getFeaturedPosts } from '@/lib/posts'

const categoryIcons = {
  guides: BookOpen,
  weapons: Sword,
  building: Shield,
  season: Star,
  tools: Wrench,
  map: Map,
}

export default function HomePage() {
  const featuredPosts = getFeaturedPosts()
  const recentPosts = posts.filter((p) => !p.featured).slice(0, 4)

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          className="relative flex min-h-[520px] items-end overflow-hidden"
          aria-labelledby="hero-heading"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/hero-bg.png"
              alt="Fortnite storm circle over the island"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/70 to-transparent" />
          </div>

          <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                #1 Fortnite Resource
              </p>
              <h1
                id="hero-heading"
                className="font-display text-5xl font-extrabold uppercase leading-none tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance"
              >
                Dominate Every<br />
                <span className="text-primary">Match</span>
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Guides, weapon tier lists, building tips, and interactive tools — everything you need to win more games in Fortnite.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/guides"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Browse All Guides <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/guides/weapons"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card/80 px-6 py-3 text-sm font-semibold text-foreground hover:border-primary/60 hover:text-primary transition-colors"
                >
                  Weapon Tier List
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Category grid */}
        <section
          className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
          aria-labelledby="categories-heading"
        >
          <h2 id="categories-heading" className="sr-only">Browse by Category</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.id]
              return (
                <Link
                  key={cat.id}
                  href={`/guides/${cat.id}`}
                  className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center transition-colors hover:border-primary/60 hover:bg-muted"
                >
                  <Icon
                    className="h-6 w-6 text-primary group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    {cat.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Featured guides */}
        <section
          className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"
          aria-labelledby="featured-heading"
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              id="featured-heading"
              className="font-display text-2xl font-bold uppercase tracking-tight text-foreground"
            >
              Featured Guides
            </h2>
            <Link
              href="/guides"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
            >
              View all <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} featured />
            ))}
          </div>
        </section>

        {/* Recent posts */}
        <section
          className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
          aria-labelledby="recent-heading"
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              id="recent-heading"
              className="font-display text-2xl font-bold uppercase tracking-tight text-foreground"
            >
              Latest Articles
            </h2>
            <Link
              href="/guides"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
            >
              View all <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        {/* SEO content strip */}
        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div>
                <h2 className="font-display text-lg font-bold uppercase text-foreground">
                  Fortnite Guides
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  From beginner basics to advanced competitive tactics, our guides cover every aspect of Fortnite gameplay. Learn building, edits, rotations, and endgame strategy.
                </p>
              </div>
              <div>
                <h2 className="font-display text-lg font-bold uppercase text-foreground">
                  Weapon Tier Lists
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Stay on top of the meta with updated weapon tier lists every patch. Know which guns are S-tier, which are worth picking up, and which to leave on the ground.
                </p>
              </div>
              <div>
                <h2 className="font-display text-lg font-bold uppercase text-foreground">
                  Season Updates
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Get the latest on each new season&apos;s battle pass, map changes, new weapons, and patch notes — so you&apos;re always prepared before dropping in.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
