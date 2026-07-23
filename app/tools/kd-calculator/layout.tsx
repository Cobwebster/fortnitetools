import type { Metadata } from 'next'
import { createMetadata, faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite K/D Calculator',
  description:
    'Calculate your Fortnite kill/death ratio, win rate, and kills per game with rough public-lobby context ranges.',
  path: '/tools/kd-calculator',
  keywords: [
    'fortnite kd calculator',
    'fortnite kill death ratio',
    'fortnite win rate',
    'fortnite stats calculator',
  ],
})

const faqs = [
  {
    question: 'What is a good K/D in Fortnite?',
    answer:
      'Many pub players sit around 0.7–1.0. A 2.0+ K/D usually means you win a lot of fights, but ranked and input type change the picture. There is no official Epic percentile for these tools.',
  },
  {
    question: 'Where do I find my Fortnite stats?',
    answer:
      'Check Career > Profile in-game, or use a third-party tracker for season and mode breakdowns.',
  },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      {children}
    </>
  )
}
