import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'

const faqs = [
  {
    question: 'Where can I see all Fortnite weapon stats?',
    answer:
      'This page lists current-pool and vaulted Fortnite weapons with DPS, damage, structure damage, fire rate, magazine size, and reload time by rarity.',
  },
  {
    question: 'How is DPS calculated on this Fortnite weapons list?',
    answer:
      'DPS = body damage × fire rate (shots per second). It is a planning metric — bloom, falloff, burst timing, and pellet spread still matter in real fights.',
  },
  {
    question: 'Are these Fortnite weapon stats exact?',
    answer:
      'They are reference values for comparison. Epic balance patches change numbers mid-season — see the Weapon Changes page for Old / New history, and always confirm in-game after updates.',
  },
  {
    question: 'Can I compare Fortnite weapons on this page?',
    answer:
      'Yes. Use the Compare weapons panel to pick any two guns and rarities, or tap Compare on a weapon card. Stats are shown side by side with the stronger value highlighted.',
  },
  {
    question: 'Where can I see Fortnite weapon buffs and nerfs?',
    answer:
      'Open Weapon Changes for patch-by-patch damage, DPS, fire rate, mag size, reload, and structure damage deltas by rarity.',
  },
]

export const metadata: Metadata = createMetadata({
  title: 'All Fortnite Weapons – DPS, Damage & Stats by Rarity',
  description:
    'Chapter 7 Season 4 (Override) Fortnite weapons with rarity tables — 8-Bit Shotgun, Mega Buster, Midas’ Masterpiece, classic unvaults, plus vaulted history. Compare DPS, damage, fire rate, mag, and reload.',
  path: '/weapons',
  keywords: [
    'fortnite weapons',
    'all fortnite weapons',
    'fortnite weapon stats',
    'fortnite override weapons',
    '8-bit shotgun fortnite',
    'mega buster fortnite',
    'fortnite weapon compare',
    'fortnite dps',
    'fortnite shotgun stats',
    'fortnite assault rifle stats',
    'vaulted fortnite weapons',
  ],
})

export default function WeaponsLayout({ children }: { children: React.ReactNode }) {
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
              { name: 'All Fortnite Weapons', path: '/weapons' },
            ])
          ),
        }}
      />
      {children}
    </>
  )
}
