import type { Metadata } from 'next'
import Link from '@/components/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FortniteIcon } from '@/components/fortnite-icon'
import {
  CATALOG_RARITY_BG,
  CATALOG_RARITY_TEXT,
  formatMagSize,
} from '@/lib/weapons-catalog'
import { allWeaponIds, buildWeaponPage } from '@/lib/weapon-pages'
import { WeaponCombatPanel } from '@/components/WeaponCombatPanel'
import { getWeaponFalloff, headshotDamage } from '@/lib/weapon-combat'
import { changeTone, formatChangeValue, formatDelta } from '@/lib/weapon-changes'
import { breadcrumbJsonLd, createMetadata, faqJsonLd } from '@/lib/seo'
import { CURRENT_SEASON } from '@/lib/season'

export const dynamicParams = false

interface Props {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return allWeaponIds().map((id) => ({ id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const model = buildWeaponPage(id)
  if (!model) return { robots: { index: false, follow: false } }
  const { weapon, description, live } = model
  return createMetadata({
    title: live
      ? `${weapon.name} – Fortnite Stats, DPS & TTK`
      : `${weapon.name} – Fortnite Stats (Vaulted)`,
    description,
    path: `/weapons/${weapon.id}`,
    keywords: [
      `${weapon.name} fortnite`,
      `${weapon.name} stats`,
      `${weapon.name} dps`,
      `${weapon.name} ttk`,
      `fortnite ${weapon.category.toLowerCase()}`,
      'fortnite weapon stats',
      live ? 'fortnite override weapons' : 'vaulted fortnite weapons',
    ],
  })
}

export default async function WeaponDetailPage({ params }: Props) {
  const { id } = await params
  const model = buildWeaponPage(id)
  if (!model) notFound()

  const {
    weapon,
    wiki,
    top,
    live,
    categoryLabel,
    intro,
    bullets,
    hsMult,
    changes,
    related,
    faqs,
    guides,
  } = model

  const falloffPack = getWeaponFalloff(weapon.id)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Weapons', path: '/weapons' },
              { name: weapon.name, path: `/weapons/${weapon.id}` },
            ])
          ),
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="relative">
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
              <Link href="/weapons" className="transition-colors hover:text-primary">
                Weapons
              </Link>
              <span>/</span>
              <span className="text-foreground">{weapon.name}</span>
            </nav>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <FortniteIcon src={weapon.image} alt={weapon.name} size="hero" />
              <div className="min-w-0 flex-1">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  {CURRENT_SEASON.shortLabel} · {categoryLabel}
                  {live ? ' · live pool' : ' · vaulted'}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
                    {weapon.name}
                  </h1>
                  {live ? (
                    <span className="rounded border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                      In pool
                    </span>
                  ) : (
                    <span className="rounded border border-rose-400/40 bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-300">
                      Vaulted
                    </span>
                  )}
                </div>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {intro[0]}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                  {guides.map((g, i) => (
                    <span key={g.href} className="inline-flex items-center gap-2">
                      {i > 0 ? <span aria-hidden="true">·</span> : null}
                      <Link href={g.href} className="text-primary hover:underline">
                        {g.label}
                      </Link>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { label: `${top.rarity} DPS`, value: String(top.dps) },
                { label: 'Body dmg', value: String(top.dmg) },
                { label: 'Struct', value: String(top.structDmg) },
                { label: 'Fire rate', value: String(top.fireRate) },
                { label: 'Mag', value: formatMagSize(top.mag) },
                { label: 'Reload', value: `${top.reload.toFixed(2)}s` },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-card px-4 py-3">
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 font-display text-xl font-bold tabular-nums text-foreground">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              {weapon.name} in Fortnite
            </h2>
            {intro.slice(1).map((p) => (
              <p key={p.slice(0, 48)} className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
            <ul className="max-w-3xl list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              {bullets.map((b) => (
                <li key={b.slice(0, 48)}>{b}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Stats by rarity
            </h2>
            <p className="max-w-3xl text-sm text-muted-foreground">
              Body damage × fire rate = DPS. Planning values — bloom, falloff, and pellet spread still
              decide real fights. Confirm in-game after patches.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30 text-left text-[10px] font-bold uppercase tracking-wider text-foreground">
                    <th className="px-4 py-2.5 font-semibold">Rarity</th>
                    <th className="px-3 py-2.5 font-semibold text-right">DPS</th>
                    <th className="px-3 py-2.5 font-semibold text-right">Dmg</th>
                    <th className="px-3 py-2.5 font-semibold text-right">Head</th>
                    <th className="px-3 py-2.5 font-semibold text-right">Struct</th>
                    <th className="px-3 py-2.5 font-semibold text-right">Fire Rate</th>
                    <th className="px-3 py-2.5 font-semibold text-right">Mag</th>
                    <th className="px-4 py-2.5 font-semibold text-right">Reload</th>
                  </tr>
                </thead>
                <tbody>
                  {weapon.variants.map((v) => (
                    <tr
                      key={v.rarity}
                      className={`border-b border-border/60 last:border-0 ${
                        v.rarity === top.rarity ? 'bg-primary/5' : ''
                      }`}
                    >
                      <td className="px-4 py-2.5">
                        <span
                          className={`inline-flex rounded border px-2 py-0.5 text-xs font-bold ${CATALOG_RARITY_BG[v.rarity]} ${CATALOG_RARITY_TEXT[v.rarity]}`}
                        >
                          {v.rarity}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums font-semibold text-foreground">
                        {v.dps}
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-foreground">{v.dmg}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-foreground">
                        {hsMult
                          ? headshotDamage(
                              v.dmg,
                              hsMult,
                              falloffPack?.curveFor(v.rarity, v.dmg).cap
                            )
                              .toFixed(1)
                              .replace(/\.0$/, '')
                          : '—'}
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-foreground">
                        {v.structDmg}
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-foreground">
                        {v.fireRate}
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-foreground">
                        {formatMagSize(v.mag)}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-foreground">
                        {v.reload.toFixed(2)}s
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <WeaponCombatPanel weapon={weapon} initialRarity={top.rarity} />

          {wiki && (wiki.firstAdded || wiki.vaultHistory) ? (
            <section className="space-y-3">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                History
              </h2>
              {wiki.firstAdded ? (
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">First added. </strong>
                  {wiki.firstAdded}
                </p>
              ) : null}
              {wiki.vaultHistory ? (
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Loot pool. </strong>
                  {wiki.vaultHistory}
                </p>
              ) : null}
            </section>
          ) : null}

          {changes.length ? (
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                Patch history
              </h2>
              <p className="max-w-3xl text-sm text-muted-foreground">
                Logged FortniteTools rows for {weapon.name}. Full archive on{' '}
                <Link href="/weapon-changes" className="text-primary hover:underline">
                  weapon changes
                </Link>
                .
              </p>
              <div className="space-y-4">
                {changes.map((hit) => (
                  <article key={hit.date} className="rounded-xl border border-border bg-card">
                    <header className="border-b border-border px-4 py-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">{hit.date}</p>
                      <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                        {hit.label}
                      </h3>
                    </header>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[520px] text-sm">
                        <thead>
                          <tr className="border-b border-border/60 text-left text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            <th className="px-4 py-2">Rarity</th>
                            <th className="px-3 py-2">Stat</th>
                            <th className="px-3 py-2 text-right">Old</th>
                            <th className="px-3 py-2 text-right">New</th>
                            <th className="px-4 py-2 text-right">Change</th>
                          </tr>
                        </thead>
                        <tbody>
                          {hit.entries.flatMap((entry) =>
                            entry.stats.map((stat) => {
                              const tone = changeTone(stat.stat, stat.change)
                              const toneClass =
                                tone === 'buff'
                                  ? 'text-emerald-400'
                                  : tone === 'nerf'
                                    ? 'text-rose-400'
                                    : 'text-foreground'
                              return (
                                <tr
                                  key={`${entry.name}-${entry.rarity}-${stat.stat}-${stat.old}-${stat.new}`}
                                  className="border-b border-border/40 last:border-0"
                                >
                                  <td className="px-4 py-2">
                                    <span
                                      className={`inline-flex rounded border px-1.5 py-0.5 text-[10px] font-bold ${CATALOG_RARITY_BG[entry.rarity]} ${CATALOG_RARITY_TEXT[entry.rarity]}`}
                                    >
                                      {entry.rarity}
                                    </span>
                                  </td>
                                  <td className="px-3 py-2 text-foreground">{stat.stat}</td>
                                  <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                                    {formatChangeValue(stat.old)}
                                  </td>
                                  <td className="px-3 py-2 text-right tabular-nums text-foreground">
                                    {formatChangeValue(stat.new)}
                                  </td>
                                  <td className={`px-4 py-2 text-right tabular-nums font-semibold ${toneClass}`}>
                                    {formatDelta(stat.change)}
                                  </td>
                                </tr>
                              )
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {related.length ? (
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                Similar {categoryLabel.toLowerCase()}
              </h2>
              <p className="max-w-3xl text-sm text-muted-foreground">
                Closest {categoryLabel.toLowerCase()} in the encyclopedia by planning DPS.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {related.map((w) => {
                  const row = w.variants.find((v) => v.rarity === top.rarity) ?? w.variants[w.variants.length - 1]!
                  return (
                    <Link
                      key={w.id}
                      href={`/weapons/${w.id}`}
                      className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-primary/50"
                    >
                      <FortniteIcon src={w.image} alt="" size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-sm font-bold uppercase tracking-wide text-foreground">
                          {w.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {row.dps} DPS · {row.dmg} dmg
                          {w.vaulted ? ' · vaulted' : ''}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          ) : null}

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Frequently asked questions
            </h2>
            <div className="max-w-3xl space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-sm font-bold text-foreground">{faq.question}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
