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
    'Every Fortnite weapon with rarity tables: Assault Rifles, Shotguns, SMGs, Pistols, DMRs, Snipers, Bows, and Explosives — DPS, damage, structure damage, fire rate, mag size, and reload. Compare any two guns side by side. Includes vaulted history.',
  path: '/weapons',
  keywords: [
    'fortnite weapons',
    'all fortnite weapons',
    'fortnite weapon stats',
    'fortnite weapon compare',
    'fortnite dps',
    'fortnite shotgun stats',
    'fortnite assault rifle stats',
    'fortnite smg stats',
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
