'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { categories } from '@/lib/posts'
import { BRAND_ICON } from '@/lib/site-icons'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between" aria-label="Main navigation">
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
            <li>
              <Link
                href="/tools"
                className="px-3 py-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors rounded-md hover:bg-muted"
              >
                Tools
              </Link>
            </li>
            <li>
              <Link
                href="/tools/item-shop"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
              >
                Item Shop
              </Link>
            </li>
            <li>
              <Link
                href="/fortnite-map"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
              >
                Map
              </Link>
            </li>
            {categories
              .filter((cat) => cat.id !== 'map')
              .map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/guides/${cat.id}`}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/tools/item-shop"
              className="rounded-md border border-border bg-muted px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              Item Shop
            </Link>
            <Link
              href="/guides"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              All Guides
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {mobileOpen && (
          <nav className="md:hidden border-t border-border pb-4 pt-2" aria-label="Mobile navigation">
            <ul className="flex flex-col gap-1" role="list">
              <li>
                <Link
                  href="/tools"
                  className="block px-3 py-2 text-sm font-semibold text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/item-shop"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Item Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/fortnite-map"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Map
                </Link>
              </li>
              {categories
                .filter((cat) => cat.id !== 'map')
                .map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/guides/${cat.id}`}
                      className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
              <li className="mt-2 px-3">
                <Link
                  href="/tools/item-shop"
                  className="block rounded-md bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                  onClick={() => setMobileOpen(false)}
                >
                  Open Item Shop
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
