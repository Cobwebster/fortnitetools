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
    'fortnite treasure hunters end date',
    'fortnite chapter 7 end event',
    'fortnite december 5 2026',
    'fortnite treasure hunters',
    'when does fortnite treasure hunters end',
    'fortnite season end date 2026',
  ],
})

const faqs = [
  {
    question: `When does Fortnite ${CURRENT_SEASON.label} end?`,
    answer: `Fortnite ${CURRENT_SEASON.label} uses ${endLabel} on this clock — the Chapter 7 end event date Epic printed. Epic may shift exact downtime by a few hours. Trust the Passes tab if the client disagrees.`,
  },
  {
    question: `When does Fortnite ${CURRENT_SEASON.next.label} start?`,
    answer: `Epic has not numbered the next season. They told players to keep Saturday 5 December open for the Chapter 7 end event (${endLabel} on this clock).`,
  },
  {
    question: 'How long is Fortnite Treasure Hunters?',
    answer:
      'Live from 1 November 2026. Captain’s Days run through 22 November (Sundays after week 1), with a Chapter 7 end event on 5 December. Epic did not print “mini-season” on fortnite.com.',
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
