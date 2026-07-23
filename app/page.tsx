import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FortniteIcon } from '@/components/fortnite-icon'
import { PostCard } from '@/components/post-card'
import { posts, categories, getFeaturedPosts } from '@/lib/posts'
import { CATEGORY_ICONS, toolIcon } from '@/lib/site-icons'

export default function HomePage() {
  const featuredPosts = getFeaturedPosts()
  const recentPosts = posts.filter((p) => !p.featured).slice(0, 4)

  return (
    <>
      <Navbar />
      <main>
        <section
          className="relative flex min-h-[520px] items-end overflow-hidden"
          aria-labelledby="hero-heading"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/hero-bg.png"
              alt="Fortnite island under a storm circle"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/70 to-transparent" />
          </div>

          <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
            <div className="max-w-xl">
              <h1
                id="hero-heading"
                className="font-display text-5xl font-extrabold uppercase leading-none tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance"
              >
                Fortnite<span className="text-primary">Tools</span>
              </h1>
              <p className="mt-5 text-lg font-semibold leading-snug text-foreground sm:text-xl">
                Free calculators and guides for Chapter 7 Season 3.
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Sensitivity converter, XP planner, keybinds, weapon stats, and
                practical drop/rotation guides — built for what players actually search.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Open free tools <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/guides/weapons/fortnite-best-weapons-tier-list-2026"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card/80 px-6 py-3 text-sm font-semibold text-foreground hover:border-primary/60 hover:text-primary transition-colors"
                >
                  Season 3 weapon tier list
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
          aria-labelledby="categories-heading"
        >
          <h2 id="categories-heading" className="sr-only">Browse by Category</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.id === 'map' ? '/fortnite-map' : `/guides/${cat.id}`}
                className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center transition-colors hover:border-primary/60 hover:bg-muted"
              >
                <FortniteIcon
                  src={CATEGORY_ICONS[cat.id]}
                  size="md"
                  frameClassName="border-transparent bg-transparent group-hover:scale-110 transition-transform"
                />
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section
          className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"
          aria-labelledby="tools-heading"
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              id="tools-heading"
              className="font-display text-2xl font-bold uppercase tracking-tight text-foreground"
            >
              Popular Tools
            </h2>
            <Link
              href="/tools"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
            >
              All tools <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { href: '/codes', label: 'Map Codes' },
              { href: '/tools/player-stats', label: 'Stats' },
              { href: '/tools/skin-rarity-calculator', label: 'Skin Rarity' },
              { href: '/tools/loadout-builder', label: 'Loadout' },
              { href: '/tools/item-shop', label: 'Item Shop' },
              { href: '/fortnite-map', label: 'Map' },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-3 text-center transition-colors hover:border-primary/60 hover:bg-muted"
              >
                <FortniteIcon
                  src={toolIcon(tool.href)}
                  size="md"
                  frameClassName="group-hover:border-primary/40 transition-colors"
                />
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  {tool.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

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

        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div>
                <h2 className="font-display text-lg font-bold uppercase text-foreground">
                  Tools
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Sensitivity converter, Battle Pass XP planner, V-Bucks helper,
                  zone timer, and more — free and updated for the current season.
                </p>
              </div>
              <div>
                <h2 className="font-display text-lg font-bold uppercase text-foreground">
                  Guides
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Season-specific weapon, map, Battle Pass, and ranked guides —
                  no filler listicles.
                </p>
              </div>
              <div>
                <h2 className="font-display text-lg font-bold uppercase text-foreground">
                  Chapter 7 Season 3
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Runners season coverage for the current loot pool and map —
                  with dates so you know when something was last checked.
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
