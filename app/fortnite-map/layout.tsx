import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import { absoluteLocaleUrl, hreflangAlternates } from '@/i18n/pathnames'

const base = createMetadata({
  title: 'Fortnite Interactive Map – Treasure Hunters, Crossbones Isle & POIs',
  description:
    'Treasure Hunters (v43.00) interactive map for Crossbones Isle. Live Fortnite-API pins: Arlong Park, Fortune’s Fort, Rubber Resort, The $.$. Rocky, Loguetown, and more. Pirate Shop Access is a BR chest prize, not a pin.',
  path: '/fortnite-map',
  keywords: [
    'fortnite map',
    'fortnite interactive map',
    'fortnite treasure hunters map',
    'crossbones isle map',
    'fortnite arlong park',
    'fortnite pirate shop',
    'fortnite map locations',
    'fortnite poi map',
    'fortnite loot map',
    'best fortnite landing spots',
    'where to land fortnite',
    'fortnite named locations',
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
