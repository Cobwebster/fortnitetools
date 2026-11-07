import type { Metadata } from 'next'
import Image from 'next/image'
import Link from '@/components/link'
import { notFound } from 'next/navigation'
import { Clock, Tag, ArrowLeft, ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AdSenseUnit } from '@/components/adsense-unit'
import { GuideMarkdown } from '@/components/guide-markdown'
import { LeakCard } from '@/components/leak-card'
import {
  leaks,
  getLeakBySlug,
  getLeakCategoryLabel,
  formatLeakDate,
  LEAK_STATUS_LABEL,
  type LeakPost,
} from '@/lib/leaks'
import { articleJsonLd, breadcrumbJsonLd, createMetadata } from '@/lib/seo'

interface Props {
  params: Promise<{ slug: string }>
}

const STATUS_CLASS: Record<LeakPost['status'], string> = {
  active: 'bg-amber-500/15 text-amber-200 border-amber-500/40',
  watching: 'bg-sky-500/15 text-sky-200 border-sky-500/40',
  shipped: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/40',
  dead: 'bg-muted text-muted-foreground border-border',
}

export async function generateStaticParams() {
  return leaks.map((leak) => ({ slug: leak.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const leak = getLeakBySlug(slug)
  if (!leak) return {}
  return createMetadata({
    title: leak.title,
    description: leak.excerpt,
    path: `/leaks/${leak.slug}`,
    keywords: leak.tags,
    type: 'article',
    publishedTime: leak.date,
    tags: leak.tags,
  })
}

export default async function LeakPostPage({ params }: Props) {
  const { slug } = await params
  const leak = getLeakBySlug(slug)
  if (!leak) notFound()

  const path = `/leaks/${leak.slug}`
  const articleLd = articleJsonLd({
    title: leak.title,
    description: leak.excerpt,
    path,
    datePublished: leak.date,
    image: leak.image,
  })
  const crumbsLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Leaks', path: '/leaks' },
    { name: leak.title, path },
  ])

  const sorted = [...leaks].sort((a, b) => b.date.localeCompare(a.date))
  const idx = sorted.findIndex((l) => l.slug === leak.slug)
  const prev = sorted[idx - 1]
  const next = sorted[idx + 1]
  const related = sorted.filter((l) => l.slug !== leak.slug && l.category === leak.category).slice(0, 2)
  const more =
    related.length >= 2
      ? related
      : [
          ...related,
          ...sorted.filter((l) => l.slug !== leak.slug && !related.some((r) => r.slug === l.slug)),
        ].slice(0, 2)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }}
      />
      <Navbar />
      <main>
        <nav aria-label="Breadcrumb">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground" role="list">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/leaks" className="transition-colors hover:text-primary">
                  Leaks
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="max-w-[220px] truncate font-medium text-foreground">{leak.title}</li>
            </ol>
          </div>
        </nav>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <article className="lg:col-span-2" itemScope itemType="https://schema.org/Article">
              {leak.image ? (
                <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80">
                  <Image
                    src={leak.image}
                    alt={leak.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    itemProp="image"
                  />
                </div>
              ) : null}

              <header className="mt-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
                    {getLeakCategoryLabel(leak.category)}
                  </span>
                  <span
                    className={`rounded border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${STATUS_CLASS[leak.status]}`}
                  >
                    {LEAK_STATUS_LABEL[leak.status]}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {leak.readTime} min read
                  </span>
                </div>
                <h1
                  className="mt-3 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-foreground sm:text-4xl text-balance"
                  itemProp="headline"
                >
                  {leak.title}
                </h1>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground" itemProp="description">
                  {leak.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <time dateTime={leak.date} itemProp="datePublished">
                    Filed {formatLeakDate(leak.date)}
                  </time>
                  {leak.confirmedDate ? (
                    <time dateTime={leak.confirmedDate}>
                      Confirmed {formatLeakDate(leak.confirmedDate)}
                    </time>
                  ) : null}
                  <span itemProp="author" itemScope itemType="https://schema.org/Organization">
                    <span itemProp="name">FortniteTools.com</span>
                  </span>
                </div>
              </header>

              <div className="prose prose-invert prose-lg mt-8 max-w-none" itemProp="articleBody">
                <GuideMarkdown content={leak.content} midAd />
              </div>

              <AdSenseUnit variant="endOfBlog" className="mt-10" />

              {leak.tags.length > 0 ? (
                <div className="mt-8 flex flex-wrap items-center gap-2">
                  <Tag className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  {leak.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-0.5 text-xs capitalize text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              <nav
                aria-label="Leak navigation"
                className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-8"
              >
                {prev ? (
                  <Link
                    href={`/leaks/${prev.slug}`}
                    className="group flex flex-col gap-1 rounded-lg border border-border p-4 transition-colors hover:border-primary/50"
                  >
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Previous
                    </span>
                    <span className="line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      {prev.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
                {next ? (
                  <Link
                    href={`/leaks/${next.slug}`}
                    className="group flex flex-col items-end gap-1 rounded-lg border border-border p-4 text-right transition-colors hover:border-primary/50"
                  >
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      Next <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      {next.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </nav>
            </article>

            <aside className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="font-display text-lg font-bold uppercase text-foreground">When it ships</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/news" className="text-primary hover:underline">
                      News
                    </Link>{' '}
                    — lobby MOTD
                  </li>
                  <li>
                    <Link href="/guides" className="text-primary hover:underline">
                      Guides
                    </Link>{' '}
                    — how-tos
                  </li>
                  <li>
                    <Link href="/sprites" className="text-primary hover:underline">
                      Sprites
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/item-shop" className="text-primary hover:underline">
                      Item Shop
                    </Link>
                  </li>
                </ul>
              </div>

              {more.length > 0 ? (
                <div>
                  <h2 className="mb-3 font-display text-lg font-bold uppercase text-foreground">
                    More leaks
                  </h2>
                  <div className="space-y-4">
                    {more.map((l) => (
                      <LeakCard key={l.slug} leak={l} />
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
