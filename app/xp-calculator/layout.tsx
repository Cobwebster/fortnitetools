import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { CURRENT_SEASON } from '@/lib/season'
import { XP_PER_LEVEL, formatXp } from '@/lib/xp-calculator'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite XP Calculator – Daily XP to Level 100 & 200',
  description: `Free Fortnite XP calculator for ${CURRENT_SEASON.label}. See daily XP needed to hit level 100 or 200, on-pace level targets, XP per level (${formatXp(XP_PER_LEVEL)}), and playtime XP rates for BR, Reload, LEGO, Festival, and Creative.`,
  path: '/xp-calculator',
  keywords: [
    'fortnite xp calculator',
    'fortnite xp per level',
    'fortnite level calculator',
    'how much xp to level up fortnite',
    'fortnite battle pass xp',
    'fortnite daily xp',
    'fortnite creative xp',
    'fortnite lego xp',
    'xp to level 100 fortnite',
    'xp to level 200 fortnite',
    'chapter 7 season 3 xp',
  ],
})

const faqs = [
  {
    question: 'How much XP is one Fortnite level?',
    answer: `Each Battle Pass level in ${CURRENT_SEASON.label} costs a flat ${formatXp(XP_PER_LEVEL)} XP.`,
  },
  {
    question: 'How much XP do I need for Fortnite level 100?',
    answer: `From level 1, level 100 takes ${formatXp(99 * XP_PER_LEVEL)} XP (99 × ${formatXp(XP_PER_LEVEL)}).`,
  },
  {
    question: 'How much XP do I need for Fortnite level 200?',
    answer: `From level 1, level 200 takes ${formatXp(199 * XP_PER_LEVEL)} XP. Super styles usually unlock along the 100–200 track.`,
  },
  {
    question: 'What is the fastest Fortnite XP mode?',
    answer:
      'Playtime rates vary — Festival Jam Stage, Creative, and LEGO modes often grant more XP per minute than Battle Royale, but weekly caps and Creative map rules still apply.',
  },
]

export default function XpCalculatorLayout({ children }: { children: React.ReactNode }) {
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
              { name: 'Fortnite XP Calculator', path: '/xp-calculator' },
            ])
          ),
        }}
      />
      {children}
    </>
  )
}
