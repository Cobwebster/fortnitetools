import type { Metadata } from 'next'
import { breadcrumbJsonLd, createMetadata, faqJsonLd, webApplicationJsonLd } from '@/lib/seo'
import { PLAYER_COMPARE_FAQS } from '@/lib/player-compare-seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Player Compare – Side-by-Side Stats Checker',
  description:
    'Compare two Fortnite players side by side: wins, K/D, win rate, kills, matches, and more. Epic, PlayStation, or Xbox — lifetime or current season.',
  path: '/tools/player-compare',
  keywords: [
    'fortnite player compare',
    'compare fortnite stats',
    'fortnite stats comparison',
    'fortnite kd compare',
    'fortnite tracker compare',
    'fortnite vs stats',
    'compare fortnite players',
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(PLAYER_COMPARE_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Tools', path: '/tools' },
              { name: 'Player Compare', path: '/tools/player-compare' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationJsonLd({
              name: 'Fortnite Player Compare',
              description:
                'Compare two Fortnite Battle Royale players side by side — wins, K/D, win rate, and more.',
              path: '/tools/player-compare',
            })
          ),
        }}
      />
      {children}
    </>
  )
}
