import type { Metadata } from 'next'
import { createMetadata, faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Weapon Damage Calculator',
  description:
    'Compare shots-to-kill, DPS, and time-to-kill for Chapter 7 Season 4 (Override) weapons. Approximate values for loadout planning — confirm in-game after patches.',
  path: '/tools/weapon-damage-calculator',
  keywords: [
    'fortnite damage calculator',
    'fortnite ttk',
    'fortnite shots to kill',
    'chapter 7 season 4 weapons',
    'fortnite override weapons',
  ],
})

const faqs = [
  {
    question: 'Are these Fortnite damage numbers exact?',
    answer:
      'No. Stats are approximate for Chapter 7 Season 4 (Override) planning. Epic balance patches and Match Overrides can change damage, fire rate, and headshot multipliers — confirm in-game after updates.',
  },
  {
    question: 'Does DPS include headshots?',
    answer:
      'Body DPS uses base damage × fire rate. When headshots are toggled on, DPS and TTK use the headshot multiplier instead.',
  },
  {
    question: 'Why don’t bloom and builds show up in TTK?',
    answer:
      'This tool assumes every listed shot lands on a standing HP pool. Real fights include bloom, falloff, builds, peeks, and healing — use STK/TTK to compare guns on paper, not as a guarantee.',
  },
  {
    question: 'Where do the weapon numbers come from?',
    answer:
      'They match our live weapons encyclopedia sample for Override. If a new collab gun is missing, check the weapons page and the weapon-changes tracker after the next patch.',
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
