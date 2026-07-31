import type { Metadata } from 'next'
import {
  createMetadata,
  faqJsonLd,
  breadcrumbJsonLd,
  webApplicationJsonLd,
} from '@/lib/seo'
import { MAP_EVOLUTION } from '@/lib/map-evolution'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Map Evolution – Compare Old & New Season Maps',
  description:
    'Compare Fortnite maps across every chapter with a drag slider — Chapter 1 Season 1 through Chapter 7 Season 3 Shattered Coast. 40 season archives, chapter filters, and then-vs-now pairings.',
  path: '/map-evolution',
  keywords: [
    'fortnite map evolution',
    'fortnite old map',
    'fortnite map comparison',
    'fortnite map through the seasons',
    'chapter 1 fortnite map',
    'chapter 2 fortnite map',
    'fortnite map then and now',
    'fortnite map history',
    'compare fortnite maps',
    'fortnite season 1 map',
    'shattered coast vs old map',
    'fortnite map slider',
    'athena vs apollo map',
    'old fortnite map vs new',
    'fortnite chapter map changes',
  ],
})

const faqs = [
  {
    question: 'What is Fortnite map evolution?',
    answer: `Map evolution is a visual history of Fortnite Battle Royale islands. This tool lets you pick any two of ${MAP_EVOLUTION.length} season snapshots and drag a slider to compare them — for example Chapter 1 Season 1 next to Chapter 7 Season 3 (Shattered Coast).`,
  },
  {
    question: 'How do I compare two Fortnite maps?',
    answer:
      'Optionally filter by chapter, choose a version for the left image and one for the right, then drag the white handle. Everything left of the handle shows the left map; everything right of the handle shows the other map.',
  },
  {
    question: 'Which Fortnite map versions are included?',
    answer: `This tool includes ${MAP_EVOLUTION.length} representative maps — one patch per season from Chapter 1 through Chapter 7, including Season X, Chapter 4 OG, Chapter 5 Remix, and Chapter 6 mini-seasons.`,
  },
  {
    question: 'Is this the live Fortnite map with chests and markers?',
    answer:
      'No. Map Evolution is historical minimap art. For the current Shattered Coast BR map with locations, use the interactive Fortnite map tool. For Reload island timers, use Map Rotation.',
  },
  {
    question: 'Are these official Epic Games maps?',
    answer:
      'The images are historical in-game minimaps archived by the community. Portions of the materials used are trademarks and/or copyrighted works of Epic Games, Inc. All rights reserved by Epic. This material is not official and is not endorsed by Epic.',
  },
  {
    question: 'Why only one map per season?',
    answer: `Epic ships many patches per season. We keep ${MAP_EVOLUTION.length} readable snapshots so the tool stays fast — enough to see chapter-scale change without hosting hundreds of near-identical mid-patch minimaps.`,
  },
]

export default function MapEvolutionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Tools', path: '/tools' },
              { name: 'Map Evolution', path: '/map-evolution' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationJsonLd({
              name: 'Fortnite Map Evolution',
              description:
                'Interactive Fortnite map evolution viewer — compare historical Battle Royale maps across chapters and seasons with a draggable slider.',
              path: '/map-evolution',
            })
          ),
        }}
      />
      {children}
    </>
  )
}
