import type { Metadata } from 'next'
import Image from 'next/image'
import Link from '@/components/link'
import { notFound } from 'next/navigation'
import { Clock, Tag, ArrowLeft, ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AdSenseUnit } from '@/components/adsense-unit'
import { CreatorCodeChip } from '@/components/creator-code-chip'
import { GuideMarkdown } from '@/components/guide-markdown'
import { LeakCard } from '@/components/leak-card'
import {
  leaks,
  getLeakBySlug,
  getLeakCategoryLabel,
  getLeakModifiedDate,
  getLeakRelatedLinks,
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

const STATUS_NEXT: Record<LeakPost['status'], string> = {
  active: 'Treat details as provisional until Epic posts or the cosmetics appear in shop/files confirmations.',
  watching: 'Partially live or tied to a known window — verify on live tools after each reset.',
  shipped: 'This beat is live or officially confirmed. Prefer guides, shop, and season tools over the leak receipt.',
  dead: 'Files look cut or the beat never landed. Keep the page as history only.',
}

export async function generateStaticParams() {
  return leaks.map((leak) => ({ slug: leak.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const leak = getLeakBySlug(slug)
  if (!leak) return {}
  const statusLabel = LEAK_STATUS_LABEL[leak.status]
  const keywords = Array.from(
    new Set([
      ...leak.tags,
      'fortnite leaks',
      'fortnite datamine',
      `${getLeakCategoryLabel(leak.category).toLowerCase()} fortnite leak`,
      statusLabel.toLowerCase(),
    ])
  )
  return createMetadata({
    title: leak.title,
    description: leak.excerpt,
    path: `/leaks/${leak.slug}`,
    keywords,
    type: 'article',
    publishedTime: leak.date,
    modifiedTime: getLeakModifiedDate(leak),
    tags: leak.tags,
    image: leak.image,
  })
}

export default async function LeakPostPage({ params }: Props) {
  const { slug } = await params
  const leak = getLeakBySlug(slug)
  if (!leak) notFound()

  const path = `/leaks/${leak.slug}`
  const modified = getLeakModifiedDate(leak)
  const relatedLinks = getLeakRelatedLinks(leak.category)
  const articleLd = articleJsonLd({
    title: leak.title,
    description: leak.excerpt,
    path,
    datePublished: leak.date,
    dateModified: modified,
    image: leak.image,
    keywords: leak.tags,
    articleSection: getLeakCategoryLabel(leak.category),
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
  const related = sorted.filter((l) => l.slug !== leak.slug && l.category === leak.category).slice(0, 3)
  const more =
    related.length >= 3
      ? related
      : [
          ...related,
          ...sorted.filter((l) => l.slug !== leak.slug && !related.some((r) => r.slug === l.slug)),
        ].slice(0, 3)

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
                <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80 lg:h-[22rem]">
                  <Image
                    src={leak.image}
                    alt={leak.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    itemProp="image"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    <span className="rounded border border-primary/30 bg-primary/90 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground backdrop-blur-sm">
                      {getLeakCategoryLabel(leak.category)}
                    </span>
                    <span
                      className={`rounded border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm ${STATUS_CLASS[leak.status]}`}
                    >
                      {LEAK_STATUS_LABEL[leak.status]}
                    </span>
                  </div>
                </div>
              ) : null}

              <CreatorCodeChip variant="support" kind="leak" className="mt-4" />

              <header className="mt-6">
                {!leak.image ? (
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="rounded border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
                      {getLeakCategoryLabel(leak.category)}
                    </span>
                    <span
                      className={`rounded border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${STATUS_CLASS[leak.status]}`}
                    >
                      {LEAK_STATUS_LABEL[leak.status]}
                    </span>
                  </div>
                ) : null}
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {leak.readTime} min read
                  </span>
                  <time dateTime={leak.date} itemProp="datePublished">
                    Filed {formatLeakDate(leak.date)}
                  </time>
                  <time dateTime={modified} itemProp="dateModified" className="sr-only">
                    Updated {formatLeakDate(modified)}
                  </time>
                  {leak.confirmedDate ? (
                    <time dateTime={leak.confirmedDate}>
                      Confirmed {formatLeakDate(leak.confirmedDate)}
                    </time>
                  ) : null}
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
                {leak.status === 'active' || leak.status === 'watching' ? (
                  <p className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm leading-relaxed text-amber-100/90">
                    File find / community report — not an Epic announcement. Cosmetics and dates can
                    change or get cut before they ship.
                  </p>
                ) : null}
                <div className="mt-4 text-sm text-muted-foreground">
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
                <h2 className="font-display text-lg font-bold uppercase text-foreground">At a glance</h2>
                <dl className="mt-3 space-y-3 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-muted-foreground">Status</dt>
                    <dd>
                      <span
                        className={`rounded border px-2 py-0.5 text-xs font-semibold uppercase tracking-wider ${STATUS_CLASS[leak.status]}`}
                      >
                        {LEAK_STATUS_LABEL[leak.status]}
                      </span>
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-muted-foreground">Category</dt>
                    <dd className="font-medium text-foreground">{getLeakCategoryLabel(leak.category)}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-muted-foreground">Filed</dt>
                    <dd className="text-foreground">
                      <time dateTime={leak.date}>{formatLeakDate(leak.date)}</time>
                    </dd>
                  </div>
                  {leak.confirmedDate ? (
                    <div className="flex items-start justify-between gap-3">
                      <dt className="text-muted-foreground">Confirmed</dt>
                      <dd className="text-foreground">
                        <time dateTime={leak.confirmedDate}>{formatLeakDate(leak.confirmedDate)}</time>
                      </dd>
                    </div>
                  ) : null}
                </dl>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{STATUS_NEXT[leak.status]}</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="font-display text-lg font-bold uppercase text-foreground">Useful next</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {relatedLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="font-medium text-primary hover:underline">
                        {link.label}
                      </Link>
                      {' — '}
                      {link.note}
                    </li>
                  ))}
                  <li>
                    <Link href="/leaks" className="font-medium text-primary hover:underline">
                      All leaks
                    </Link>
                    {' — '}
                    status index
                  </li>
                </ul>
              </div>

              {more.length > 0 ? (
                <div>
                  <h2 className="mb-3 font-display text-lg font-bold uppercase text-foreground">
                    Related leaks
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
