import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FreeCosmeticsClient } from '@/components/FreeCosmeticsClient'
import { FREE_COSMETIC_OFFERS, FREE_COSMETICS_REVIEWED } from '@/lib/free-cosmetics'
import { CURRENT_SEASON } from '@/lib/season'

const faqs = [
  {
    q: 'What free cosmetics are live in Override right now?',
    a: 'Fortnitemares Nitemare quests (Jack-a-Nape set through 31 Oct), Jimothy Sidekick (extract a Dumpster Dive Sprite at a real Extraction Site), Prophetic Tapestry login, Admin Panel Lobby Hacks, Ranked Null, Battle Pass free track, and evergreen account rewards like 2FA Boogie Down. Hit Active to hide expired windows.',
  },
  {
    q: 'How do I get the free Jack-a-Nape skin?',
    a: 'Complete 26 Nitemare quests across BR / Zero Build, Horde Rush, and Reload. Progress carries between modes. Milestone cosmetics unlock earlier (Wind-Up Key at 8, Tambourine at 20, outfit at 26). Ends 31 October 2026.',
  },
  {
    q: 'How do I get Jimothy?',
    a: 'Extract any Dumpster Dive Sprite at a physical Extraction Site in Battle Royale or Zero Build. Portable Extractor often does not count. Then check Locker → Sidekicks. Ends 31 October 2026. Step-by-step is in the Jimothy how-to on this site.',
  },
  {
    q: 'What is the Admin Panel?',
    a: 'Override Lobby Hack codes in the BR lobby (Ranked off). Epic codes give XP, Sprite Dust, Sprites, cosmetics, and Fortnitemares lobby effects — never V-Bucks. Redeem before the season ends.',
  },
  {
    q: 'Can I still get Boogie Down for free?',
    a: 'Yes. Enable two-factor authentication on your Epic account. It sits under ongoing account rewards with no end date.',
  },
  {
    q: 'When does the free Battle Pass track end?',
    a: `${CURRENT_SEASON.codename} is scheduled through 1 November 2026. Finish free-track, Fortnitemares (31 Oct), and seasonal ranked quests before then.`,
  },
  {
    q: 'Does “Mark as completed” sync to Epic?',
    a: 'No. It only saves in this browser so you can track what you already finished. In-game progress still comes from Epic.',
  },
]

export default function FreeCosmeticsPage() {
  return (
    <>
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
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Free Cosmetics</span>
            </nav>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {CURRENT_SEASON.codename} · updated {FREE_COSMETICS_REVIEWED}
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Free Fortnite <span className="text-primary">Cosmetics</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Fortnitemares freebies through 31 Oct (Jack-a-Nape quests, Jimothy, login loading screen),
              plus Admin Panel codes, Ranked Null, Battle Pass free track, and account links that never
              expire. Mark what you finished — browser only.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <strong className="text-foreground">{FREE_COSMETIC_OFFERS.length}</strong> offers ·{' '}
              <Link
                href="/guides/how-to/fortnite-admin-panel-lobby-hack-codes"
                className="text-primary hover:underline"
              >
                Admin Panel guide
              </Link>
              {' · '}
              <Link href="/tools/item-shop" className="text-primary hover:underline">
                Item Shop
              </Link>
              {' · '}
              <Link href="/season-countdown" className="text-primary hover:underline">
                Countdown
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
          <section className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card px-4 py-4">
              <h2 className="text-sm font-bold text-foreground">Fortnitemares first</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Nitemare quests unlock Jack-a-Nape and the Wind-Up Key set through 31 Oct. Extract a
                Dumpster Dive Sprite for{' '}
                <Link href="/guides/how-to/how-to-get-jimothy-fortnite" className="text-primary hover:underline">
                  Jimothy
                </Link>{' '}
                while you are at it.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card px-4 py-4">
              <h2 className="text-sm font-bold text-foreground">Lobby Hacks</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Admin Panel in the pubs lobby — XP, Sprite Dust, Fortnitemares transforms. Scam sites
                promising free V-Bucks are lying.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card px-4 py-4">
              <h2 className="text-sm font-bold text-foreground">Evergreen freebies</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                2FA Boogie Down, LEGO link, MyDisney, and survey rewards stay available when seasonal
                drops rotate out. Ranked Null styles end with Override (1 Nov).
              </p>
            </div>
          </section>

          <FreeCosmeticsClient />

          <section className="space-y-3 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              How we keep this list honest
            </h2>
            <div className="max-w-2xl space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Each card has an end date when Epic published one. Active hides finished windows so
                you are not grinding a dead Twitch drop. We refresh when Fortnitemares / Lobby Hack /
                ranked windows change — not by inventing V-Bucks generators.
              </p>
              <p>
                For step-by-step Admin Panel redeem tips, use the{' '}
                <Link
                  href="/guides/how-to/fortnite-admin-panel-lobby-hack-codes"
                  className="text-primary hover:underline"
                >
                  Admin Panel guide
                </Link>
                . Jimothy: extract a Dumpster Dive Sprite —{' '}
                <Link
                  href="/guides/how-to/how-to-get-jimothy-fortnite"
                  className="text-primary hover:underline"
                >
                  Jimothy how-to
                </Link>
                . For Null climb habits, see the{' '}
                <Link
                  href="/guides/how-to/how-to-get-null-ranked-rewards-fortnite"
                  className="text-primary hover:underline"
                >
                  Null ranked guide
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Frequently asked questions
            </h2>
            <div className="space-y-4 max-w-3xl">
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="text-sm font-bold text-foreground">{faq.q}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
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
