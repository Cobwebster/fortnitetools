import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import {
  CURRENT_SEASON,
  formatSeasonLongDate,
  getSeasonCountdown,
  seasonEndDate,
} from '@/lib/season'

const endLabel = formatSeasonLongDate(seasonEndDate())
const snap = getSeasonCountdown()
const daysPhrase =
  snap.ended
    ? `${CURRENT_SEASON.label} has ended`
    : `${snap.daysRemaining} days remaining`

export const metadata: Metadata = createMetadata({
  title: `When Does Fortnite ${CURRENT_SEASON.label} End? Countdown & Date`,
  description: `Fortnite ${CURRENT_SEASON.label} (${CURRENT_SEASON.codename}) ends on ${endLabel}. Live countdown — ${daysPhrase}. See when ${CURRENT_SEASON.next.label} starts.`,
  path: '/season-countdown',
  keywords: [
    'when does fortnite season end',
    'fortnite season countdown',
    'when does chapter 7 season 4 end',
    'fortnite chapter 7 season 4 end date',
    'fortnite override end date',
    'fortnite season 4 end date',
    'chapter 7 season 5 start date',
    'fortnite season end date 2026',
  ],
})

const faqs = [
  {
    question: `When does Fortnite ${CURRENT_SEASON.label} end?`,
    answer: `Fortnite ${CURRENT_SEASON.label} (${CURRENT_SEASON.codename}) ends on ${endLabel}. Epic may shift the exact downtime by a few hours — this countdown tracks the announced calendar date (November 1 on Epic’s Battle Pass page).`,
  },
  {
    question: `When does Fortnite ${CURRENT_SEASON.next.label} start?`,
    answer: `${CURRENT_SEASON.next.label} is expected to start on ${endLabel}, right after ${CURRENT_SEASON.label} ends.`,
  },
  {
    question: 'How long is Fortnite Override?',
    answer:
      'Chapter 7 Season 4 (Override) runs from August 20, 2026 through November 1, 2026 — about 73 days. Exact downtime can move a few hours.',
  },
  {
    question: 'Will my Battle Pass progress carry over?',
    answer:
      'No. Unclaimed Battle Pass rewards from the current season disappear when the season ends. Finish levels before the countdown hits zero — use the Battle Pass XP calculator to check if you can make it.',
  },
]

export default function SeasonCountdownLayout({ children }: { children: React.ReactNode }) {
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
              { name: 'Season Countdown', path: '/season-countdown' },
            ])
          ),
        }}
      />
      {children}
    </>
  )
}
