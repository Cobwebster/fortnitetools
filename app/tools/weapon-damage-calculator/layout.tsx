import type { Metadata } from 'next'
import { createMetadata, faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Weapon Damage Calculator',
  description:
    'Compare shots-to-kill, DPS, and time-to-kill for Chapter 7 Season 3 weapons. Approximate values for loadout planning.',
  path: '/tools/weapon-damage-calculator',
  keywords: [
    'fortnite damage calculator',
    'fortnite ttk',
    'fortnite shots to kill',
    'chapter 7 season 3 weapons',
  ],
})

const faqs = [
  {
    question: 'Are these Fortnite damage numbers exact?',
    answer:
      'No. Stats are approximate for Chapter 7 Season 3 planning. Epic balance patches can change damage, fire rate, and headshot multipliers.',
  },
  {
    question: 'Does DPS include headshots?',
    answer:
      'Body DPS uses base damage × fire rate. When headshots are toggled on, DPS and TTK use the headshot multiplier instead.',
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
