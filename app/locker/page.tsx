import type { Metadata } from 'next'
import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LockerEditor } from '@/components/LockerEditor'
import { breadcrumbJsonLd, createMetadata, faqJsonLd } from '@/lib/seo'
import { ensureMyLocker, getMyLocker, LOCKERS_SETUP_HINT } from '@/lib/lockers-db'
import { resolveLockerCosmetics } from '@/lib/lockers'
import { CURRENT_SEASON } from '@/lib/season'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Locker – Build, Save & Share',
  description:
    'Make and share your own Fortnite locker. Sign in or register, add your cosmetics, then send the link.',
  path: '/locker',
  keywords: [
    'fortnite locker',
    'fortnite locker builder',
    'share fortnite locker',
    'fortnite cosmetics locker',
  ],
})

const lockerFaqs = [
  {
    question: 'Can I build a Fortnite locker on FortniteTools?',
    answer:
      'Yes. Sign in or register, add the cosmetics you want to show off, then share your locker with a public link.',
  },
  {
    question: 'Do I need an account to make a locker?',
    answer:
      'Yes. Log in or register for a free FortniteTools account, then you can build, save, and flex your locker.',
  },
  {
    question: 'Can I share my locker with friends?',
    answer:
      'Yes — copy the share URL and send it. Marking it public makes the link work for anyone. The /lockers directory is a checked snapshot from the last site build, so it will not show up there until the next deploy.',
  },
]

export default async function LockerHubPage() {
  const mine = await getMyLocker()

  if (!mine.userId) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(lockerFaqs)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              breadcrumbJsonLd([
                { name: 'Home', path: '/' },
                { name: 'Locker', path: '/locker' },
              ])
            ),
          }}
        />
        <Navbar />
        <main className="min-h-screen bg-background">
          <section className="py-12">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                {CURRENT_SEASON.shortLabel} · Cosmetics
              </p>
              <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
                Fortnite <span className="text-primary">Locker</span>
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Make and share your own locker. Sign in or register to start.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/login?next=/locker"
                  className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-primary-foreground"
                >
                  Log in
                </Link>
                <Link
                  href="/register?next=/locker"
                  className="rounded-lg border border-border px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
                >
                  Register
                </Link>
                <Link
                  href="/lockers"
                  className="rounded-lg border border-border px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
                >
                  Player lockers
                </Link>
              </div>
            </div>
          </section>

          <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
            <section className="max-w-3xl space-y-4">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                Build, share, and flex your locker
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                If you sign in, you can build your own Fortnite locker and share it. Add outfits,
                back blings, pickaxes, gliders, wraps, and emotes, then send the link so friends can
                see what you run.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                It is a FortniteTools locker you put together yourself — a public flex page, not a
                pull from Epic’s in-game inventory. Register is free. After you log in, search a
                cosmetic, hit Add, and copy your share URL.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                Player lockers
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                The public directory is a snapshot from the last site build — only lockers we have
                checked. Sign in to queue yours for the next one.
              </p>
              <Link
                href="/lockers"
                className="inline-flex rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-bold uppercase tracking-wider text-primary hover:bg-primary/20"
              >
                Browse /lockers
              </Link>
            </section>

            <section className="max-w-3xl space-y-4">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                Frequently asked questions
              </h2>
              <div className="space-y-4">
                {lockerFaqs.map((faq) => (
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

  if (mine.setupMissing) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
            <h1 className="font-display text-3xl font-bold uppercase text-foreground">Locker</h1>
            <p className="mt-3 text-sm text-muted-foreground">{LOCKERS_SETUP_HINT}</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const ensured = mine.locker ? { locker: mine.locker } : await ensureMyLocker()
  if ('error' in ensured && ensured.error) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
            <h1 className="font-display text-3xl font-bold uppercase text-foreground">Locker</h1>
            <p className="mt-3 text-sm text-rose-300">{ensured.error}</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const locker = ensured.locker!
  const items = await resolveLockerCosmetics(locker.itemIds)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Locker</span>
            </nav>
            <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-foreground">
              Build your <span className="text-primary">Locker</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Add cosmetics you own, then share your locker.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <LockerEditor locker={locker} items={items} />
        </div>
      </main>
      <Footer />
    </>
  )
}
