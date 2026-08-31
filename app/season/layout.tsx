import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { SEASON_HUB_FAQS } from '@/lib/season-hub'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Chapter 7 Season 4 Override – Map, Ranked, Battle Pass',
  description:
    'Fortnite Override (Chapter 7 Season 4) hub: new POIs (Green Hill Zone, Reality’s Reign, Stone Sanctum), Match Overrides, ranked reset, and Battle Pass end date (November 1, 2026). Last reviewed 31 Aug 2026.',
  path: '/season',
  keywords: [
    'fortnite chapter 7 season 4',
    'fortnite override',
    'fortnite season 4 hub',
    'fortnite green hill zone',
    'fortnite match override',
    'fortnite ranked reset',
    'fortnite override battle pass',
    'when does fortnite season 4 end',
  ],
})

export default function SeasonLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(SEASON_HUB_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Season', path: '/season' },
            ])
          ),
        }}
      />
      {children}
    </>
  )
}
