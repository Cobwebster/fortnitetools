import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WeaponChangesClient } from '@/components/WeaponChangesClient'
import {
  WEAPON_CHANGE_ENTRY_COUNT,
  WEAPON_CHANGE_PATCHES,
  WEAPON_CHANGES_SOURCE_NOTE,
  WEAPON_CHANGES_UPDATED_AT,
} from '@/lib/weapon-changes'
import { CURRENT_SEASON } from '@/lib/season'

const faqs = [
  {
    q: 'What does Old / New / Change mean?',
    a: 'Old is the value before the patch, New is after, and Change is the delta. Green usually means a buff; red usually means a nerf. For reload time, a lower number is a buff.',
  },
  {
    q: 'Are these numbers official?',
    a: 'They are compiled reference values from public balance history. Epic can hotfix mid-week — confirm in-game after every update.',
  },
  {
    q: 'Where can I see current weapon stats?',
    a: 'Open the full weapons encyclopedia for live-pool and vaulted rarity tables, or use the damage calculator for shots-to-kill.',
  },
]

export default function WeaponChangesPage() {
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
                'radial-gradient(ellipse 70% 55% at 15% -10%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 60%), radial-gradient(ellipse 45% 40% at 90% 0%, color-mix(in oklab, #f59e0b 12%, transparent), transparent 55%), linear-gradient(180deg, var(--card), var(--background))',
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <nav className="mb-5 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/weapons" className="hover:text-primary transition-colors">
                Weapons
              </Link>
              <span>/</span>
              <span className="text-foreground">Weapon Changes</span>
            </nav>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {CURRENT_SEASON.shortLabel} · Balance history
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              Fortnite <span className="text-primary">Weapon Changes</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Buffs and nerfs across patches — damage, DPS, fire rate, magazine size, reload, and
              structure damage with Old / New / Change by rarity. Jump to a date or search a gun.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <strong className="text-foreground">{WEAPON_CHANGE_PATCHES.length}</strong> patch days ·{' '}
              <strong className="text-foreground">{WEAPON_CHANGE_ENTRY_COUNT}</strong> rarity changes ·
              updated {WEAPON_CHANGES_UPDATED_AT}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <Link href="/weapons" className="text-primary hover:underline">
                All weapons
              </Link>
              {' · '}
              <Link href="/tools/weapon-damage-calculator" className="text-primary hover:underline">
                Damage calculator
              </Link>
              {' · '}
              <Link href="/tools/loadout-builder" className="text-primary hover:underline">
                Loadout builder
              </Link>
              {' · '}
              <Link href="/tools" className="text-primary hover:underline">
                All tools
              </Link>
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-12">
          <WeaponChangesClient />

          <section className="space-y-3 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              About this weapon balance archive
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {WEAPON_CHANGES_SOURCE_NOTE} Pair this with the{' '}
              <Link href="/weapons" className="text-primary hover:underline">
                weapons encyclopedia
              </Link>{' '}
              for current stats and the{' '}
              <Link href="/tools/weapon-damage-calculator" className="text-primary hover:underline">
                damage calculator
              </Link>{' '}
              for shots-to-kill after a patch.
            </p>
          </section>

          <section className="space-y-4 border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              FAQ
            </h2>
            <dl className="space-y-4">
              {faqs.map((item) => (
                <div key={item.q} className="max-w-3xl">
                  <dt className="font-semibold text-foreground">{item.q}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
