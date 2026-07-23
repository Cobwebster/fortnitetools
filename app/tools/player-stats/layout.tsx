import type { Metadata } from 'next'
import { breadcrumbJsonLd, createMetadata, faqJsonLd, webApplicationJsonLd } from '@/lib/seo'
import { PLAYER_STATS_FAQS } from '@/lib/player-stats-seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Player Stats Lookup – K/D, Wins & Tracker',
  description:
    'Look up Fortnite stats by Epic username: K/D, wins, win rate, matches, kills, Solo/Duo/Squad breakdowns, and Battle Pass level. Free player stats tracker.',
  path: '/tools/player-stats',
  keywords: [
    'fortnite stats',
    'fortnite tracker',
    'fortnite kd',
    'fortnite player lookup',
    'fortnite stats checker',
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
              { name: 'Player Stats', path: '/tools/player-stats' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationJsonLd({
              name: 'Fortnite Player Stats Lookup',
              description:
                'Look up Fortnite Battle Royale stats by username — K/D, wins, matches, and mode breakdowns.',
              path: '/tools/player-stats',
            })
          ),
        }}
      />
      {children}
    </>
  )
}
