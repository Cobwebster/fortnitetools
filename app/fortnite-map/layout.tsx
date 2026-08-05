import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import { absoluteLocaleUrl, hreflangAlternates } from '@/i18n/pathnames'

const base = createMetadata({
  title: 'Fortnite Interactive Map – Extraction Sites, POIs & Loot',
  description:
    'Free Fortnite Chapter 7 Season 3 map: live Shattered Coast minimap with Extraction Sites for Sprites, named POIs, loot ratings, hot drops, and rotation tips.',
  path: '/fortnite-map',
  keywords: [
    'fortnite map',
    'fortnite interactive map',
    'fortnite extraction sites',
    'fortnite sprite extraction map',
    'shattered coast map',
    'fortnite map locations',
    'fortnite poi map',
    'fortnite loot map',
    'best fortnite landing spots',
    'where to land fortnite',
    'fortnite named locations',
    'chapter 7 season 3 map',
    'fortnite runners map',
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
