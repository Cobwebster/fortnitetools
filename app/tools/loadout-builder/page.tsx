import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LoadoutBuilderClient } from './loadout-builder-client'
import { LOADOUT_FAQS } from '@/lib/loadout-seo'

export default function LoadoutBuilderPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border bg-card py-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-primary transition-colors">
                Tools
              </Link>
              <span>/</span>
              <span className="text-foreground">Loadout Builder</span>
            </nav>
            <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
              Fortnite <span className="text-primary">Loadout Builder</span>
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Plan a Chapter 7 Season 3 (Runners) hotbar for Shattered Coast — shotgun, AR/rifle, SMG or sidearm, heals,
              and mobility — with real item icons and estimated shots-to-kill / time-to-kill. Build a kit, then share a
              loadout link with teammates so they open the same hotbar.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <LoadoutBuilderClient />

          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-3">
              How to build a Fortnite loadout in Chapter 7 Season 3
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground mb-6">
              A strong hotbar is five jobs, not five “strongest guns.” Close range, mid range, cleanup, sustain, and
              rotation each deserve a slot. Use the presets above as starting points, then swap for what you actually loot
              on drop.
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed text-muted-foreground max-w-3xl">
              <li>
                Click a hotbar slot, then pick from the current Runners sample — Extending Focus, Striker Pump, Chaos Reloader,
                Maven Auto, Surgical Burst, Warforged AR, Stinger, Flex SMG, Lancehead, Shock Rocks, Seven Sliders, and more.
              </li>
              <li>
                Set target HP to 100 / 150 / 200 and toggle headshots to see how STK and TTK change for each combat weapon
                in your kit.
              </li>
              <li>
                Lock heals (smalls, bigs, Med Kit, Chug Splash, Slap Juice…) and mobility (Shockwave, Seven Sliders, Crash
                Pad, Launch Pad…) so you do not greed a third gun before shields.
              </li>
              <li>
                Compare presets (Aggressive, Box/Pump, Mid-range) or dig into individual guns with the{' '}
                <Link href="/tools/weapon-damage-calculator" className="text-primary hover:underline">
                  weapon damage calculator
                </Link>
                .
              </li>
              <li>
                Hit <strong className="text-foreground">Copy loadout link</strong> to copy a shareable URL. Teammates open the
                same shotgun / AR / SMG / heals / mobility combo — the clean landing page stays param-free until you change
                a kit.
              </li>
            </ol>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-3">
              Share a Fortnite loadout link with your duo or trio
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground mb-4">
              After you tweak slots, the address bar updates with a short share URL (for example{' '}
              <code className="text-xs text-foreground">?sg=striker_pump&amp;ar=warforged_ar&amp;…</code>
              ). Send that link in Discord, party chat, or socials — anyone who opens it lands on your exact Chapter 7
              Season 3 hotbar with STK/TTK still visible. The default tool page does not inject query params until you
              modify the loadout, so the canonical URL stays clean for search.
            </p>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-6">
              Slot priorities for Shattered Coast
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-sm leading-relaxed text-muted-foreground">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Shotgun</h3>
                <p>
                  Close fights still decide most contested POIs. Extending Focus is the flexible season pick; Striker Pump
                  rewards first-shot accuracy in boxes; Chaos Reloader hits hard then auto-reloads while stowed; Maven Auto
                  sprays when you cannot land pumps. See the{' '}
                  <Link href="/guides/weapons/fortnite-shotgun-guide-best-options" className="text-primary hover:underline">
                    shotgun guide
                  </Link>{' '}
                  for pairing tips.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">AR / Rifle</h3>
                <p>
                  Surgical Burst and Warforged cover mid peeks and tag-up before you close. Snipers (Hunting Rifle, Heavy
                  Impact) are optional swaps when your drop path has long sightlines — they replace the AR slot in this
                  builder when you want a long-range kit.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">SMG / Sidearm</h3>
                <p>
                  Stinger, Rapid Fire, and Flex SMG clean cracked opponents; Lancehead and Ranger punish peeks outside
                  shotgun range. If your shotgun already sprays (Maven), a higher-damage sidearm often beats a second SMG.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Heals &amp; mobility</h3>
                <p>
                  Small shields first, then bigs or Med Kit based on fight pace. Mobility wins rotates into zone — Seven
                  Sliders and Shock Rocks are the season movement staples; practice timing with the{' '}
                  <Link href="/tools/zone-timer" className="text-primary hover:underline">
                    zone timer
                  </Link>{' '}
                  so you leave with Shockwaves or Sliders instead of walking storm.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-3">
              Reading STK and TTK (without overtrusting them)
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground mb-4">
              Shots-to-kill answers “how many hits if every pellet/bullet connects.” Time-to-kill answers “how long that
              takes at listed fire rate.” Real Fortnite fights add bloom, builds, peek timing, and third parties — so treat
              the table as a relative ranking tool. A gun with worse paper TTK can still win if it is easier to land or
              pairs better with your movement item.
            </p>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              For the full season ranking and drop notes, read the{' '}
              <Link href="/guides/weapons/fortnite-best-weapons-tier-list-2026" className="text-primary hover:underline">
                Chapter 7 Season 3 weapons tier list
              </Link>
              .
            </p>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-5 max-w-3xl">
              {LOADOUT_FAQS.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-sm font-bold text-foreground mb-1.5">{faq.question}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 border-t border-border pt-10">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground mb-4">
              Related Fortnite tools &amp; guides
            </h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/tools/weapon-damage-calculator" className="text-primary hover:underline">
                  Weapon Damage Calculator
                </Link>
              </li>
              <li>
                <Link href="/guides/weapons/fortnite-best-weapons-tier-list-2026" className="text-primary hover:underline">
                  Weapons Tier List
                </Link>
              </li>
              <li>
                <Link href="/guides/weapons/fortnite-shotgun-guide-best-options" className="text-primary hover:underline">
                  Shotgun Guide
                </Link>
              </li>
              <li>
                <Link href="/fortnite-map" className="text-primary hover:underline">
                  Interactive Map
                </Link>
              </li>
              <li>
                <Link href="/tools/zone-timer" className="text-primary hover:underline">
                  Zone Timer
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-primary hover:underline">
                  All Tools
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
