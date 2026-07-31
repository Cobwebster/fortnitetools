'use client'

import Link from 'next/link'
import { AuthNavLinks } from '@/components/auth-nav-links'
import { BRAND_ICON } from '@/lib/site-icons'

const NAV_LINKS = [
  { href: '/tools', label: 'Tools', emphasis: true },
  { href: '/tools/player-stats', label: 'Player Tracker' },
  { href: '/tools/item-shop', label: 'Item Shop' },
  { href: '/codes', label: 'Codes' },
  { href: '/free-cosmetics', label: 'Free Cosmetics' },
  { href: '/season-countdown', label: 'Countdown' },
  { href: '/weapons', label: 'Weapons' },
  { href: '/fortnite-map', label: 'Map' },
  { href: '/guides', label: 'Guides' },
  { href: 'https://discord.gg/Tj9GPyCQC4', label: 'Discord', external: true },
] as const

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between gap-3" aria-label="Main navigation">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={BRAND_ICON}
              alt=""
              className="h-10 w-10 object-contain drop-shadow-sm"
              aria-hidden="true"
            />
            <span className="font-display text-xl font-bold uppercase tracking-wider text-foreground">
              Fortnite<span className="text-primary">Tools</span>
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.filter((link) => link.href !== '/guides').map((link) => (
              <li key={link.href}>
                {'external' in link && link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className={
                      'emphasis' in link && link.emphasis
                        ? 'px-3 py-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors rounded-md hover:bg-muted'
                        : 'px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted'
                    }
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <AuthNavLinks />
            <Link
              href="/guides"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              All Guides
            </Link>
          </div>

          <div className="md:hidden shrink-0">
            <AuthNavLinks />
          </div>
        </nav>

        {/* Always in the HTML (no hamburger) so crawlers and users always see every link */}
        <nav
          className="md:hidden border-t border-border py-2"
          aria-label="Mobile site links"
        >
          <ul className="flex flex-wrap gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                {'external' in link && link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className={
                      'emphasis' in link && link.emphasis
                        ? 'inline-flex rounded-md px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-muted transition-colors'
                        : 'inline-flex rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors'
                    }
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
