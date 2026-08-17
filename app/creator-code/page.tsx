import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FortniteIcon } from '@/components/fortnite-icon'
import { CreatorCodeClient } from '@/components/CreatorCodeClient'
import { CREATOR_CODE_FAQS } from '@/lib/creator-code'

const CODE_KINDS = [
  {
    icon: '/images/icons/vbucks.png',
    title: 'V-Bucks / gift-card PIN',
    body: 'Adds prepaid V-Bucks. Redeem on Epic’s card site — consoles often mint a second Sony or Microsoft code. Never type this into Item Shop → Enter Code.',
    href: '/guides/how-to/how-to-redeem-fortnite-code',
    label: 'Redeem guide',
  },
  {
    icon: '/images/loadout/golden_apple.png',
    title: 'Support-A-Creator slug',
    body: 'The overlay code (ninja, clix…). Price stays the same; a cut of eligible shop / Pass / Crew SKUs goes to that Epic account while the code is stuck on yours.',
    href: '#lookup',
    label: 'Look up below',
  },
  {
    icon: '/images/loadout/launch_pad.png',
    title: 'Creative island code',
    body: 'Twelve digits with dashes. Paste it in Discover, not the shop. XP maps, 1v1s, and tycoons live on the codes page.',
    href: '/codes',
    label: 'Map codes',
  },
] as const

const MISTAKES = [
  {
    problem: '“Invalid code” in the Item Shop',
    cause: 'You pasted a gift-card PIN or a clan tag',
    fix: 'PINs go to fortnite.com/vbuckscard. SAC slugs are short names — look them up here first.',
  },
  {
    problem: 'Code works in this checker, shop ignores it',
    cause: 'Creator paused SAC, or the SKU is not eligible (some gifts / regional packs)',
    fix: 'Purchase can still go through with nobody supported. Re-enter before Battle Pass / Crew.',
  },
  {
    problem: 'V-Bucks landed on the wrong locker',
    cause: 'Signed into the wrong Epic, or redeemed the console’s second code on the wrong PSN/Xbox ID',
    fix: 'Stop. Check locker before Confirm next time. Receipt + Epic support — we cannot move V-Bucks.',
  },
  {
    problem: 'Phishing “verify your creator code”',
    cause: 'Discord/Instagram pages asking for password or a PIN screenshot',
    fix: 'Only the in-game shop field or Epic’s official sites. We never ask for your password.',
  },
] as const

export default function CreatorCodePage() {
  return (
    <>
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
          <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-14">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Creator Code</span>
            </nav>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Support-A-Creator · last reviewed 17 Aug 2026
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Creator Code</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Players search “Fortnite code” for three different boxes. This page is the overlay slug — look up
              whether it is still ACTIVE and which Epic name it maps to — then type it in the Item Shop. It is not
              a coupon, not a V-Bucks PIN, and not a Creative island.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <Link href="/guides/how-to/how-to-redeem-fortnite-code" className="text-primary hover:underline">
                PIN redeem walkthrough
              </Link>
              {' · '}
              <Link href="/tools/item-shop" className="text-primary hover:underline">
                Item Shop
              </Link>
              {' · '}
              <Link href="/codes" className="text-primary hover:underline">
                Island codes
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-12 px-4 py-10 sm:px-6">
          <section className="grid gap-3 sm:grid-cols-3">
            {CODE_KINDS.map((kind) => (
              <article key={kind.title} className="rounded-xl border border-border bg-card p-4">
                <FortniteIcon src={kind.icon} alt={kind.title} size="sm" />
                <h2 className="mt-3 font-display text-sm font-bold uppercase tracking-wide text-foreground">
                  {kind.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{kind.body}</p>
                <Link href={kind.href} className="mt-3 inline-block text-sm text-primary hover:underline">
                  {kind.label}
                </Link>
              </article>
            ))}
          </section>

          <div id="lookup">
            <CreatorCodeClient />
          </div>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Enter it in the Item Shop
            </h2>
            <ol className="space-y-3">
              {[
                {
                  icon: '/images/loadout/golden_apple.png',
                  text: 'Open Fortnite on the account you actually shop on. Wrong Epic = the cut still goes out, just not from the locker you meant.',
                },
                {
                  icon: '/images/icons/vbucks.png',
                  text: 'Item Shop → Enter Code. Paste the slug from the lookup (or the stream overlay). Confirm until the creator name shows.',
                },
                {
                  icon: '/images/icons/battle_pass.png',
                  text: 'Buy Battle Pass, Crew, or cosmetics as normal. Price does not drop. Some gifts / regional packs skip SAC — the buy can succeed with nobody supported.',
                },
                {
                  icon: '/images/loadout/pulse_scanner.png',
                  text: 'If you have not shopped in a while, re-enter before a big checkout. Epic’s stick window is not a lifetime lock.',
                },
              ].map((step, i) => (
                <li key={step.text} className="flex gap-3 rounded-xl border border-border bg-card px-4 py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-xs font-bold text-foreground">
                    {i + 1}
                  </span>
                  <FortniteIcon src={step.icon} alt="" size="xs" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              Mistakes this checker exists for
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30 text-[10px] font-bold uppercase tracking-wider text-foreground">
                    <th className="px-3 py-2.5">What you see</th>
                    <th className="px-3 py-2.5">Usually means</th>
                    <th className="px-3 py-2.5">What to do</th>
                  </tr>
                </thead>
                <tbody>
                  {MISTAKES.map((row) => (
                    <tr key={row.problem} className="border-b border-border/50 last:border-0">
                      <td className="px-3 py-2.5 font-semibold text-foreground">{row.problem}</td>
                      <td className="px-3 py-2.5 text-muted-foreground">{row.cause}</td>
                      <td className="px-3 py-2.5 text-muted-foreground">{row.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3 rounded-xl border border-border bg-card px-4 py-4 text-sm leading-relaxed text-muted-foreground">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
              What this page will not do
            </h2>
            <p>
              It will not apply the code to your account, move V-Bucks, or tell you a creator’s current revenue split.
              Fortnite-API returns slug, Epic display name, ACTIVE/INACTIVE, and an optional verified flag. In-game
              still wins. Full PIN / console two-step redeem lives in the{' '}
              <Link href="/guides/how-to/how-to-redeem-fortnite-code" className="text-primary hover:underline">
                redeem guide
              </Link>
              , last walked on 1 Aug 2026.
            </p>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">FAQ</h2>
            <div className="space-y-4">
              {CREATOR_CODE_FAQS.map((faq) => (
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
