import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CommunitySubmitCta } from '@/components/community-submit-cta'
import { UploadSubmissionCard } from '@/components/upload-submission-card'
import { LoadoutBuilderClient } from './loadout-builder-client'
import { LOADOUT_FAQS } from '@/lib/loadout-seo'
import { fetchCommunityFeed } from '@/lib/community-submissions-db'

export default async function LoadoutBuilderPage() {
  const { items: communityLoadouts } = await fetchCommunityFeed({ kind: 'loadout', limit: 5 })

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border bg-card py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
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
              Plan a full Chapter 7 Season 4 inventory — five-slot hotbar, wood/stone/metal, ammo, and heal
              stacks — then read STK/TTK and a kit scorecard. Start from Ranked, contest, Zero Build, Duo, or
              Fortnitemares use cases and share one link with the lobby.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          {communityLoadouts.length > 0 ? (
            <section className="mb-10">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                    Community loadouts
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Open any kit in this builder — hotbar, mats, and ammo come with the link.
                  </p>
                </div>
                <Link href="/upload/loadout" className="text-sm font-bold text-primary hover:underline">
                  Submit yours →
                </Link>
              </div>
              <div className="grid gap-3 lg:grid-cols-2">
                {communityLoadouts.map((item) => (
                  <UploadSubmissionCard key={item.id} item={item} compact />
                ))}
              </div>
            </section>
          ) : null}

          <LoadoutBuilderClient />

          <div className="mt-10">
            <CommunitySubmitCta
              href="/upload/loadout"
              title="Upload your inventory to the community feed"
              body="Copy the share link from this builder, post it on /upload, and other players can open your exact hotbar + mats plan."
            />
          </div>

          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-3">
              How to build a Fortnite inventory (not just a hotbar)
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground mb-6">
              Guns win the clip; mats and heals win the game. A strong kit is five hotbar jobs plus enough wood
              to retake, stone/metal for late pieces, and ammo that survives two third-parties. Use the presets
              as scenarios, then edit for what you actually loot on drop.
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed text-muted-foreground max-w-3xl">
              <li>
                Pick a use case (Ranked endgame, Contested POI, Zero Build, Duo support, Fortnitemares…) or start
                from Aggressive / Box / Zone and customize.
              </li>
              <li>
                Click a hotbar slot and re-loot from the Override pool. Slot 4 has a heal stack slider; slot 5 is
                mobility and fight gadgets (Shockwave, EMP, Scanner, Turret…).
              </li>
              <li>
                Set wood / stone / metal with the mat presets or sliders (0–500). Piece estimate is ~10 mats per
                build — same mental math as in-game.
              </li>
              <li>
                Tune ammo (shells / light / medium / heavy) or hit Auto to match your combat trio. Check the kit
                scorecard for thin sustain, weak rotates, or low-mat Ranked kits.
              </li>
              <li>
                Set target HP to 100 / 150 / 200, toggle headshots for STK/TTK, then{' '}
                <strong className="text-foreground">Copy inventory link</strong> so teammates open the same
                hotbar + mats + ammo plan.
              </li>
            </ol>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-3">
              Share a full inventory link with your duo or trio
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground mb-4">
              After you tweak slots or mats, the address bar updates with a short share URL (hotbar ids plus{' '}
              <code className="text-xs text-foreground">mw</code> / <code className="text-xs text-foreground">ms</code>{' '}
              / <code className="text-xs text-foreground">mm</code> for materials and ammo keys). Send that link in
              Discord or party chat — anyone who opens it lands on your exact inventory with the scorecard and
              STK/TTK still visible. The default tool page stays param-free until you change a kit.
            </p>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-6">
              Slot and mat priorities for Override
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-sm leading-relaxed text-muted-foreground">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Shotgun</h3>
                <p>
                  Close fights still decide contested POIs. Pump rewards first-shot accuracy; 8-Bit and Sweeper
                  spray when you cannot land pumps; Wood Stake is the Fortnitemares shotgun. See the{' '}
                  <Link href="/guides/weapons/fortnite-shotgun-guide-best-options" className="text-primary hover:underline">
                    shotgun guide
                  </Link>{' '}
                  for pairing tips.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">AR / Rifle</h3>
                <p>
                  Classic AR and Heavy AR cover mid peeks after v42.40; Drum Gun and Ranger AR are vaulted. Mega
                  Buster is still a charge-lane swap. Snipers replace the AR slot here when your drop path has
                  long sightlines.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Mats</h3>
                <p>
                  Contest drops can live on a wood spike; Ranked endgame wants the 500/500/500 cap. Practice piece
                  spam in the{' '}
                  <Link href="/tools/fortnite-build-simulator" className="text-primary hover:underline">
                    build simulator
                  </Link>{' '}
                  when the inventory plan is set.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Heals &amp; mobility</h3>
                <p>
                  Smalls first, then bigs / splashes / Med Kit based on fight pace. Mobility wins rotates — keep
                  Shockwaves or Overdrive for zone; use the{' '}
                  <Link href="/tools/zone-timer" className="text-primary hover:underline">
                    zone timer
                  </Link>{' '}
                  so you leave with utility instead of walking storm.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground mb-3">
              Reading STK, TTK, and the scorecard
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground mb-4">
              Shots-to-kill answers “how many hits if every pellet/bullet connects.” Time-to-kill answers “how long
              that takes at listed fire rate.” The scorecard answers “is this kit thin on shields, rotates, or
              mats?” Real fights add bloom, builds, and third parties — treat the numbers as relative planning, not
              a guarantee.
            </p>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              For the season ranking and drop notes, read the{' '}
              <Link href="/guides/weapons/fortnite-best-weapons-tier-list-2026" className="text-primary hover:underline">
                weapons tier list
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
                <Link href="/weapons" className="text-primary hover:underline">
                  Weapon Damage Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/fortnite-build-simulator" className="text-primary hover:underline">
                  Build Simulator
                </Link>
              </li>
              <li>
                <Link href="/guides/weapons/fortnite-best-weapons-tier-list-2026" className="text-primary hover:underline">
                  Weapons Tier List
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
