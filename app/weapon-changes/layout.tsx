import type { Metadata } from 'next'
import {
  createMetadata,
  faqJsonLd,
  breadcrumbJsonLd,
  webApplicationJsonLd,
} from '@/lib/seo'
import {
  WEAPON_CHANGE_ENTRY_COUNT,
  WEAPON_CHANGE_PATCHES,
} from '@/lib/weapon-changes'

const faqs = [
  {
    question: 'What are Fortnite weapon changes?',
    answer:
      'Weapon changes are balance patches from Epic Games that buff or nerf damage, DPS, fire rate, magazine size, reload time, structure damage, and other stats. This page lists historical Old / New / Change values by rarity.',
  },
  {
    question: 'How often does Fortnite change weapon damage?',
    answer:
      'Epic often ships mid-season hotfixes and content updates that retune the loot pool. Check this page after major patches, and always confirm final numbers in-game.',
  },
  {
    question: `How many Fortnite weapon balance patches are listed here?`,
    answer: `This archive currently covers ${WEAPON_CHANGE_PATCHES.length} patch days and ${WEAPON_CHANGE_ENTRY_COUNT} rarity-level weapon change rows, from recent Chapter 7 updates back through earlier seasons.`,
  },
]

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Weapon Changes – Damage Buffs, Nerfs & Patch History',
  description:
    'Every Fortnite weapon balance change in one place — damage, DPS, fire rate, mag size, reload, and structure damage with Old / New / Change by rarity. Track buffs and nerfs across patches.',
  path: '/weapon-changes',
  keywords: [
    'fortnite weapon changes',
    'fortnite weapon buffs',
    'fortnite weapon nerfs',
    'fortnite damage changes',
    'fortnite balance patch',
    'fortnite weapon patch notes',
    'fortnite dps changes',
    'fortnite weapon history',
  ],
})

export default function WeaponChangesLayout({ children }: { children: React.ReactNode }) {
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
              { name: 'Weapons', path: '/weapons' },
              { name: 'Weapon Changes', path: '/weapon-changes' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationJsonLd({
              name: 'Fortnite Weapon Changes',
              description:
                'Browse Fortnite weapon balance history with Old / New / Change stats for damage, DPS, fire rate, and more.',
              path: '/weapon-changes',
            })
          ),
        }}
      />
      {children}
    </>
  )
}
