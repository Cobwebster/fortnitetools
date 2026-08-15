import type { Metadata } from 'next'
import {
  createMetadata,
  faqJsonLd,
  breadcrumbJsonLd,
  webApplicationJsonLd,
} from '@/lib/seo'
import { CURRENT_SEASON } from '@/lib/season'
import { MAP_ROTATION_FAQS } from '@/lib/map-rotation-seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Map Rotation – What Reload Map Is On Right Now?',
  description:
    'Live Fortnite Reload map rotation timer. See what map is on right now (Oasis, Slurp Rush, Springfield), minutes remaining, what map is next, and the full hourly schedule. Blitz Royale rotation included.',
  path: '/map-rotation',
  keywords: [
    'fortnite map rotation',
    'fortnite reload map rotation',
    'what reload map is on right now',
    'what map is reload on',
    'reload map rotation times',
    'fortnite reload map schedule',
    'when does the reload map change',
    'how often do reload maps change',
    'fortnite reload map timer',
    'next reload map',
    'fortnite oasis map',
    'fortnite slurp rush',
    'fortnite springfield reload',
    'when is springfield live fortnite',
    'elite stronghold fortnite',
    'fortnite squid grounds',
    'fortnite blitz map rotation',
    'what map is blitz royale on',
    `fortnite reload map rotation ${CURRENT_SEASON.shortLabel.toLowerCase()}`,
    'fortnite map rotation 2026',
  ],
})

export default function MapRotationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(MAP_ROTATION_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Tools', path: '/tools' },
              { name: 'Map Rotation', path: '/map-rotation' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationJsonLd({
              name: 'Fortnite Map Rotation Timer',
              description:
                'Live Fortnite Reload and Blitz map rotation timer with the active island, time remaining, next map, and the full hourly schedule.',
              path: '/map-rotation',
            })
          ),
        }}
      />
      {children}
    </>
  )
}
