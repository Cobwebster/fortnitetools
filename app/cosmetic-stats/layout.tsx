import type { Metadata } from 'next'
import { breadcrumbJsonLd, createMetadata, faqJsonLd, webApplicationJsonLd } from '@/lib/seo'
import { COSMETIC_STATS_FAQS } from '@/lib/cosmetic-stats'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Cosmetic Stats – Shop Occurrences, Vaults & Catalog Mix',
  description:
    'Fortnite cosmetic stats: most Item Shop occurrences, longest vault wait, rarity and season mix, type counts, and what’s in the shop tonight — from Fortnite-API, not wishlists.',
  path: '/cosmetic-stats',
  keywords: [
    'fortnite cosmetic stats',
    'fortnite most used skins',
    'fortnite shop appearances',
    'fortnite vaulted skins',
    'fortnite rare skins shop history',
    'fortnite item shop stats',
    'most appeared fortnite skins',
  ],
})

export default function CosmeticStatsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(COSMETIC_STATS_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Cosmetic Stats', path: '/cosmetic-stats' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationJsonLd({
              name: 'Fortnite Cosmetic Stats',
              description:
                'Rank Fortnite cosmetics by Item Shop occurrences, vault time, rarity, season, type, and tonight’s shop.',
              path: '/cosmetic-stats',
            })
          ),
        }}
      />
      {children}
    </>
  )
}
