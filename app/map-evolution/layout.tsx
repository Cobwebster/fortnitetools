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
    'Slide to compare Fortnite maps across every chapter and season — Chapter 1 Season 1 through Chapter 7 Season 3. Side-by-side map evolution viewer with chapter filters.',
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
  ],
})

const faqs = [
  {
    question: 'What is Fortnite map evolution?',
    answer:
      'Map evolution is a side-by-side comparison of Fortnite Battle Royale islands across seasons and chapters. Drag the slider to reveal one version on the left and another on the right — for example Chapter 1 Season 1 next to Chapter 7 Season 3.',
  },
  {
    question: 'Which Fortnite map versions are included?',
    answer: `This tool includes ${MAP_EVOLUTION.length} representative maps — one patch per season from Chapter 1 through Chapter 7, including Season X, Chapter 4 OG, Chapter 5 Remix, and Chapter 6 mini-seasons.`,
  },
  {
    question: 'Are these official Epic Games maps?',
    answer:
      'The images are historical in-game minimaps archived by the community. Portions of the materials used are trademarks and/or copyrighted works of Epic Games, Inc. All rights reserved by Epic. This material is not official and is not endorsed by Epic.',
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
