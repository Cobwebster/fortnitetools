import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { RANKED_FAQS } from '@/lib/ranked-hub'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Ranked – LP, Override Drops & Climb Notes',
  description:
    'How Fortnite ranked LP works in Chapter 7 Season 4 (Override), which returning drops to use, and Match Override caveats. Distinct from the long climb guide and from the playlist catalog. Last reviewed 31 Aug 2026.',
  path: '/ranked',
  keywords: [
    'fortnite ranked',
    'fortnite ranked lp',
    'how fortnite ranked works',
    'fortnite ranked drops',
    'fortnite override ranked',
    'fortnite ranked reset',
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
