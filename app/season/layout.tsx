import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { SEASON_HUB_FAQS } from '@/lib/season-hub'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Treasure Hunters – Crossbones Isle, Ranked, Battle Pass',
  description:
    'Fortnite Treasure Hunters hub: Crossbones Isle POIs, Captain’s Days, Pirate Shop Access, Shock Rocket, Sprite Wanted Posters, ranked reset, and the 5 December Chapter 7 end event. Last reviewed 1 Nov 2026.',
  path: '/season',
  keywords: [
    'fortnite treasure hunters',
    'crossbones isle',
    'fortnite one piece',
    'fortnite captain’s day',
    'fortnite ranked reset',
    'treasure hunters battle pass',
    'when does fortnite treasure hunters end',
    'fortnite chapter 7 end event',
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
