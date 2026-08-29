import type { Metadata } from 'next'
import Link from '@/components/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SetMembersClient } from '@/components/SetMembersClient'
import { fetchLiveSets, fetchSetMembers, formatSetDay, getLiveSet, SET_DETAIL_FAQS, summarizeSetMembers } from '@/lib/cosmetic-sets'
import { breadcrumbJsonLd, createMetadata, faqJsonLd } from '@/lib/seo'
import { CURRENT_SEASON } from '@/lib/season'

export const revalidate = 600
export const dynamicParams = true

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const sets = await fetchLiveSets()
  return sets.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const sets = await fetchLiveSets()
  const set = getLiveSet(sets, slug)
  if (!set) return { robots: { index: false, follow: false } }
  return createMetadata({
    title: `${set.name} Set – Fortnite Cosmetics & Shop History`,
    description: `Members of the Fortnite ${set.name} set${set.inShop ? ' (in tonight’s Item Shop)' : set.fromNew ? ' (on the current game build)' : ''}, with shop-history counts. Live cap only — the URL 404s when the set rotates out.`,
    path: `/sets/${set.slug}`,
    keywords: [`${set.name} fortnite`, `${set.name} set`, 'fortnite cosmetic set', 'fortnite shop set'],
  })
}

export default async function SetDetailPage({ params }: Props) {
  const { slug } = await params
  const sets = await fetchLiveSets()
  const set = getLiveSet(sets, slug)
  if (!set) notFound()

  const members = await fetchSetMembers(set)
  const summary = summarizeSetMembers(members)
  const typeLine = Object.entries(summary.byType)
    .sort((a, b) => b[1] - a[1])
    .map(([type, n]) => `${n} ${type}${n === 1 ? '' : 's'}`)
    .join(' · ')
  const others = sets.filter((s) => s.slug !== set.slug).slice(0, 8)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(SET_DETAIL_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Sets', path: '/sets' },
              { name: set.name, path: `/sets/${set.slug}` },
            ])
          ),
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="relative overflow-hidden border-b border-border">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 65% 50% at 10% 0%, color-mix(in oklab, var(--primary) 20%, transparent), transparent 60%), linear-gradient(180deg, var(--card), var(--background))',
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <Link href="/sets" className="transition-colors hover:text-primary">
                Sets
              </Link>
              <span>/</span>
              <span className="text-foreground">{set.name}</span>
            </nav>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {CURRENT_SEASON.shortLabel} · {set.inShop ? 'in shop tonight' : 'current-build set'}
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              {set.name} <span className="text-primary">Set</span>
            </h1>
            {set.setText ? (
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{set.setText}</p>
            ) : null}
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Live set page: {set.inShop ? 'in tonight’s Item Shop' : 'not in tonight’s shop'}
              {set.fromNew ? ' · also on the current-build new list' : ''}. Click a member for
              styles. Prices stay on the Item Shop tracker. If this slug 404s tomorrow, the set left
              the live cap — that is intentional.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <Link href="/tools/item-shop" className="text-primary hover:underline">
                Item Shop
              </Link>
              {' · '}
              <Link href="/new-cosmetics" className="text-primary hover:underline">
                New cosmetics
              </Link>
              {' · '}
              <Link href="/tools/skin-rarity-calculator" className="text-primary hover:underline">
                Rarity tool
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
          {members.length ? (
            <section className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Roster</p>
                <p className="mt-1 text-sm text-foreground">
                  {summary.total} member{summary.total === 1 ? '' : 's'}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{typeLine || '—'}</p>
              </div>
              <div className="rounded-xl border border-border bg-card px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Shop history</p>
                <p className="mt-1 text-sm text-foreground">
                  {summary.withHistory} sold · {summary.exclusive} with no history
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {summary.lastShop
                    ? `Last appearance ${formatSetDay(summary.lastShop)}${summary.firstShop && summary.firstShop !== summary.lastShop ? ` · first ${formatSetDay(summary.firstShop)}` : ''}`
                    : 'Pass / exclusive / unreleased — not a shop veteran'}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tonight</p>
                <p className="mt-1 text-sm text-foreground">{set.inShop ? 'In the Item Shop' : 'Not in the shop'}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {set.sampleCount} tile{set.sampleCount === 1 ? '' : 's'} on the live shop/new lists that pointed here
                </p>
              </div>
            </section>
          ) : null}
          {members.length === 0 ? (
            <p className="rounded-xl border border-border bg-card px-4 py-6 text-sm text-muted-foreground">
              No catalog members returned for this set name. It may only exist as a shop bundle tile —
              check the Item Shop.
            </p>
          ) : (
            <section>
              <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wide text-foreground">
                Members
              </h2>
              <SetMembersClient items={members} />
            </section>
          )}

          {others.length ? (
            <section className="border-t border-border pt-10">
              <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
                Other live sets
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {others.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/sets/${s.slug}`}
                    className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground hover:border-primary/60 hover:text-primary"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              How to read this page
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Shop-history counts come from Fortnite-API (same flags as the rarity tool). A high
              count usually means the cosmetic has been in the shop often; zero usually means Battle
              Pass, exclusive, or not released yet. “New build” is not the same as purchasable.
              V-Bucks stay on the{' '}
              <Link href="/tools/item-shop" className="font-semibold text-primary hover:underline">
                Item Shop
              </Link>
              . Scarcity scoring lives on the{' '}
              <Link href="/tools/skin-rarity-calculator" className="font-semibold text-primary hover:underline">
                rarity calculator
              </Link>
              .
            </p>
            {SET_DETAIL_FAQS.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-border bg-card px-4 py-3">
                <h3 className="text-sm font-bold text-foreground">{faq.question}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
