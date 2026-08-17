import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { PLAYLIST_FAQS } from '@/lib/fortnite-playlists'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Game Modes – BR, Ranked, Reload, OG & LTMs',
  description:
    'Current Fortnite playlist catalog from game files: Battle Royale, Zero Build, Ranked, Reload, OG, LTMs, Festival, LEGO, and Rocket Racing — cleaned of test and bot queues.',
  path: '/modes',
  keywords: [
    'fortnite game modes',
    'fortnite playlists',
    'fortnite ranked',
    'fortnite reload modes',
    'fortnite zero build',
    'fortnite og playlist',
    'fortnite ltm',
  ],
})

export default function ModesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(PLAYLIST_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Game Modes', path: '/modes' },
            ])
          ),
        }}
      />
      {children}
    </>
  )
}
