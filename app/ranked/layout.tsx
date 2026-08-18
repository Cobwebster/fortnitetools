import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { RANKED_FAQS } from '@/lib/ranked-hub'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Ranked Reset – LP, Tiers, and Which Drops to Use',
  description:
    'How Fortnite ranked LP works this season, when the ladder resets for Chapter 7 Season 4 (August 19–20 2026), and which Shattered Coast drops to use. Distinct from the long climb guide and from the playlist catalog. Last reviewed 18 Aug 2026.',
  path: '/ranked',
  keywords: [
    'fortnite ranked reset',
    'fortnite ranked lp',
    'how fortnite ranked works',
    'fortnite ranked drops',
    'fortnite ranked season 4',
    'fortnite ranked reset date',
    'fortnite bronze to unreal',
  ],
})

export default function RankedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(RANKED_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Ranked', path: '/ranked' },
            ])
          ),
        }}
      />
      {children}
    </>
  )
}
