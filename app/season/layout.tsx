import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { SEASON_HUB_FAQS } from '@/lib/season-hub'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Chapter 7 Season 4 – What Changed (Island, Loot, Ranked)',
  description:
    'Reset-week hub for Fortnite Chapter 7 Season 4: what is still true on Shattered Coast, what the August 20 reboot confirms, and what we will not invent (S4 POIs, loot, mythics). Last reviewed 17 Aug 2026.',
  path: '/season',
  keywords: [
    'fortnite chapter 7 season 4',
    'fortnite season 4 hub',
    'fortnite what changed',
    'fortnite season 4 loot pool',
    'fortnite season 4 mythics',
    'fortnite ranked reset',
    'fortnite battle pass free track',
    'reality reboots august 20',
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
