import Link from 'next/link'
import { categories } from '@/lib/posts'
import { BRAND_ICON } from '@/lib/site-icons'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={BRAND_ICON}
                alt=""
                className="h-9 w-9 object-contain drop-shadow-sm"
                aria-hidden="true"
              />
              <span className="font-display text-lg font-bold uppercase tracking-wider text-foreground">
                Fortnite<span className="text-primary">Tools</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Free Fortnite calculators and guides for the current season.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              FortniteTools.com is not affiliated with Epic Games.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Categories</h3>
            <ul className="mt-4 flex flex-col gap-2" role="list">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={cat.id === 'map' ? '/fortnite-map' : `/guides/${cat.id}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Guides</h3>
            <ul className="mt-4 flex flex-col gap-2" role="list">
              <li>
                <Link href="/guides" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  All Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/weapons/fortnite-best-weapons-tier-list-2026"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Weapons Tier List
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/map/fortnite-loot-guide-best-spots"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Best Loot Spots
                </Link>
              </li>
              <li>
                <Link href="/guides/map" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Map Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/season/fortnite-season-battle-pass-guide"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Battle Pass Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Tools</h3>
            <ul className="mt-4 flex flex-col gap-2" role="list">
              <li>
                <Link href="/fortnite-map" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Interactive Map
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/tools/item-shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Item Shop
                </Link>
              </li>
              <li>
                <Link href="/tools/loadout-builder" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Loadout Builder
                </Link>
              </li>
              <li>
                <Link href="/tools/sensitivity-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sensitivity Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/vbucks-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  V-Bucks Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/battle-pass-xp-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  XP Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/weapon-damage-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Damage Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/kd-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  K/D Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/fps-settings" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FPS Settings Guide
                </Link>
              </li>
              <li>
                <Link href="/tools/keybinds" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Pro Keybinds
                </Link>
              </li>
              <li>
                <Link href="/tools/zone-timer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Zone Timer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} FortniteTools.com. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Fortnite&reg; is a trademark of Epic Games, Inc. This site is not endorsed by or affiliated with Epic Games.
          </p>
        </div>
      </div>
    </footer>
  )
}
