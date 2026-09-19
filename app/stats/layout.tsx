import type { Metadata } from 'next'
import {
  createMetadata,
  faqJsonLd,
  breadcrumbJsonLd,
  webApplicationJsonLd,
} from '@/lib/seo'
import { STATS_HUB_FAQS } from '@/lib/stats-hub'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Player Stats – Tracked Leaderboards & Peak CCU Rankings',
  description:
    'Fortnite player stats leaderboards from accounts we poll via Fortnite-API — season wins, kills, Battle Pass level, and time — plus mode and Creative popularity by peak CCU. Look up any name on the tracker.',
  path: '/stats',
  keywords: [
    'fortnite player stats',
    'fortnite stats',
    'fortnite leaderboard',
    'fortnite stats leaderboard',
    'fortnite player stats leaderboard',
    'fortnite popularity leaderboard',
    'fortnite peak ccu',
    'most popular fortnite modes',
    'most popular fortnite creative maps',
    'fortnite concurrent players',
    'fortnite player count leaderboard',
    'fortnite tracker',
  ],
})

export default function StatsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(STATS_HUB_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Fortnite Player Stats', path: '/stats' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationJsonLd({
              name: 'Fortnite Player Stats',
              description:
                'Tracked Fortnite player stats leaderboards and mode popularity by peak concurrent players.',
              path: '/stats',
            })
          ),
        }}
      />
      {children}
    </>
  )
}
