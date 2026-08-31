import type { Metadata } from 'next'
import { createMetadata, faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Battle Pass XP Calculator',
  description:
    'Estimate Battle Pass progress for Chapter 7 Season 4 (Override). Enter your level and weekly XP sources to see if you can finish before November 1, 2026.',
  path: '/tools/battle-pass-xp-calculator',
  keywords: [
    'fortnite xp calculator',
    'battle pass xp',
    'fortnite levels calculator',
    'chapter 7 season 4 battle pass',
    'fortnite override battle pass',
  ],
})

const faqs = [
  {
    question: 'How much XP is one Battle Pass level?',
    answer:
      'This planner uses a simplified ~80,000 XP per level model. Real quest values, boosts, and caps change during the season.',
  },
  {
    question: 'When does Chapter 7 Season 4 end?',
    answer:
      'Override is scheduled through November 1, 2026. Use the season countdown for remaining time; Epic can shift downtime by a few hours.',
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
