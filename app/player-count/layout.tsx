import type { Metadata } from 'next'
import {
  createMetadata,
  faqJsonLd,
  breadcrumbJsonLd,
  webApplicationJsonLd,
} from '@/lib/seo'
import { PLAYER_COUNT_FAQS } from '@/lib/player-count'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Player Count – Popular Maps & Peak Concurrent Players',
  description:
    'Fortnite player count for Battle Royale, Reload, OG, Blitz, LEGO, and popular Creative maps. Peak concurrent players and unique players from Epic’s public Data API.',
  path: '/player-count',
  keywords: [
    'fortnite player count',
    'fortnite players online',
    'how many people play fortnite',
    'fortnite concurrent players',
    'popular fortnite maps',
    'most popular fortnite creative maps',
    'fortnite battle royale player count',
    'fortnite reload player count',
    'steal the brainrot player count',
    'fortnite peak ccu',
  ],
})

export default function PlayerCountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(PLAYER_COUNT_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Player Count', path: '/player-count' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationJsonLd({
              name: 'Fortnite Player Count',
              description:
                'Track Fortnite peak concurrent players for Epic modes and popular Creative maps.',
              path: '/player-count',
            })
          ),
        }}
      />
      {children}
    </>
  )
}
