import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FortniteNewsClient } from '@/components/FortniteNewsClient'
import { fetchFortniteNews, NEWS_FAQS } from '@/lib/fortnite-news'
import { CURRENT_SEASON } from '@/lib/season'

export const revalidate = 600

export default async function NewsPage() {
  const data = await fetchFortniteNews().catch(() => ({
    brDate: null,
    brHash: null,
    brCollage: null,
    motds: [],
    stwDate: null,
    stwMessages: [],
  }))

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="relative overflow-hidden border-b border-border">
          {data.brCollage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.brCollage}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
            />
          ) : null}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(180deg, color-mix(in oklab, var(--background) 35%, transparent), var(--background))',
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">News</span>
            </nav>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {CURRENT_SEASON.shortLabel} · Lobby MOTDs
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">News</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              The same Battle Royale news tiles as the in-game lobby, plus a short FortniteTools note that
              points at the map, shop, weapons, or countdown — not a copy of Epic&apos;s patch blog.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <Link href="/season-countdown" className="text-primary hover:underline">
                Season countdown
              </Link>
              {' · '}
              <Link href="/status" className="text-primary hover:underline">
                Is Fortnite down
              </Link>
              {' · '}
              <Link href="/new-cosmetics" className="text-primary hover:underline">
                New cosmetics
              </Link>
              {' · '}
              <Link href="/modes" className="text-primary hover:underline">
                Game modes
              </Link>
              {' · '}
              <Link href="/tools/item-shop" className="text-primary hover:underline">
                Item Shop
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
          <FortniteNewsClient data={data} />

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">FAQ</h2>
            <div className="max-w-3xl space-y-4">
              {NEWS_FAQS.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-border bg-card px-4 py-3">
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
