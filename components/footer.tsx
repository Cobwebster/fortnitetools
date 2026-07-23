import Link from 'next/link'
import { categories } from '@/lib/posts'
import { BRAND_ICON } from '@/lib/site-icons'
import { EPIC_DISCLAIMER } from '@/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
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
              Free Fortnite calculators and guides for the current season. Independent fan project.
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
            </ul>
          </div>

          {/* Tools */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Tools</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2" role="list">
              {[
                { href: '/tools', label: 'All Tools' },
                { href: '/tools/player-stats', label: 'Player Stats' },
                { href: '/codes', label: 'Map Codes' },
                { href: '/fortnite-map', label: 'Interactive Map' },
                { href: '/tools/loadout-builder', label: 'Loadout Builder' },
                { href: '/tools/item-shop', label: 'Item Shop' },
                { href: '/tools/skin-rarity-calculator', label: 'Skin Rarity' },
                { href: '/tools/weapon-damage-calculator', label: 'Damage Calc' },
                { href: '/tools/sensitivity-calculator', label: 'Sensitivity' },
                { href: '/tools/vbucks-calculator', label: 'V-Bucks' },
                { href: '/tools/battle-pass-xp-calculator', label: 'XP Calculator' },
                { href: '/tools/kd-calculator', label: 'K/D Calculator' },
                { href: '/tools/zone-timer', label: 'Zone Timer' },
                { href: '/tools/fps-settings', label: 'FPS Settings' },
                { href: '/tools/keybinds', label: 'Keybinds' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Site</h3>
            <ul className="mt-4 flex flex-col gap-2" role="list">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://www.craftmc.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Minecraft Tools
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-4 sm:px-5">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-200/90 mb-1.5">
            Independent fan site — not Epic Games
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">{EPIC_DISCLAIMER}</p>
        </div>

        <div className="mt-6 border-t border-border pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} FortniteTools.com. All rights reserved. Also check out our Minecraft site{' '}
            <a
              href="https://www.craftmc.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline underline-offset-2 hover:text-primary transition-colors"
            >
              CraftMC
            </a>
            .
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
