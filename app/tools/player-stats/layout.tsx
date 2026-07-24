import type { Metadata } from 'next'
import { breadcrumbJsonLd, createMetadata, faqJsonLd, webApplicationJsonLd } from '@/lib/seo'
import { PLAYER_STATS_FAQS } from '@/lib/player-stats-seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Tracker & Stats Checker – K/D, Wins, Player Lookup',
  description:
    'Free Fortnite tracker and stats checker: look up any Epic username for K/D, wins, win rate, matches, kills, Solo/Duo/Squad breakdowns, and Battle Pass level.',
  path: '/tools/player-stats',
  keywords: [
    'fortnite tracker',
    'fortnite stats checker',
    'fortnite stats',
    'fortnite kd',
    'fortnite player lookup',
    'fortnite username lookup',
    'fortnite wins',
    'epic games stats',
    'fortnite career stats',
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(PLAYER_STATS_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Tools', path: '/tools' },
              { name: 'Fortnite Tracker', path: '/tools/player-stats' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationJsonLd({
              name: 'Fortnite Tracker & Stats Checker',
              description:
                'Look up Fortnite Battle Royale stats by username — K/D, wins, matches, and mode breakdowns. Free Fortnite tracker.',
              path: '/tools/player-stats',
            })
          ),
        }}
      />
      {children}
    </>
  )
}
