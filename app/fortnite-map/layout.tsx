import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import { absoluteLocaleUrl, hreflangAlternates } from '@/i18n/pathnames'

const base = createMetadata({
  title: 'Fortnite Interactive Map – Override POIs, Spawns & Loot',
  description:
    'Free Fortnite Chapter 7 Season 4 (Override) map: live minimap with named POIs including Green Hill Zone, spawn layers, loot ratings, hot drops, and rotation tips.',
  path: '/fortnite-map',
  keywords: [
    'fortnite map',
    'fortnite interactive map',
    'fortnite override map',
    'fortnite green hill zone',
    'fortnite map locations',
    'fortnite poi map',
    'fortnite loot map',
    'best fortnite landing spots',
    'where to land fortnite',
    'fortnite named locations',
    'chapter 7 season 4 map',
    'fortnite minimap',
    'fortnite drop spots',
  ],
})

export const metadata: Metadata = {
  ...base,
  alternates: {
    canonical: absoluteLocaleUrl('en', '/fortnite-map'),
    languages: hreflangAlternates('/fortnite-map'),
  },
}

export default function FortniteMapLayout({ children }: { children: React.ReactNode }) {
  return children
}
