import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { FREE_COSMETIC_OFFERS } from '@/lib/free-cosmetics'

export const metadata: Metadata = createMetadata({
  title: 'Free Fortnite Cosmetics – Drops, Quests & Passes (2026)',
  description: `Track ${FREE_COSMETIC_OFFERS.length}+ free Fortnite cosmetics: Twitch drops, Sprite mastery, Ranked rewards, Battle Pass free track, LEGO / OG / Music Pass, account links, and timed quests with end dates.`,
  path: '/free-cosmetics',
  keywords: [
    'free fortnite cosmetics',
    'free fortnite skins',
    'fortnite free rewards',
    'fortnite twitch drops',
    'fortnite sprite mastery rewards',
    'fortnite ranked free rewards',
    'how to get free fortnite cosmetics',
    'fortnite free battle pass rewards',
    'fortnite 2fa emote',
  ],
})

const faqs = [
  {
    question: 'How do I get free Fortnite cosmetics?',
    answer:
      'Timed quests, Twitch drops, Ranked milestones, free pass tracks, Sprite mastery, account links (LEGO, MyDisney, 2FA), and collab promotions. This page lists active and ongoing methods with end dates.',
  },
  {
    question: 'Do free Fortnite rewards expire?',
    answer:
      'Many do — Twitch drops, seasonal quests, and Ranked events have end dates. Ongoing offers like 2FA Boogie Down or default unlocks have no deadline.',
  },
  {
    question: 'Is Mark as completed synced to my Epic account?',
    answer:
      'No. It only saves in your browser so you can track what you already finished. In-game progress still comes from Epic.',
  },
]

export default function FreeCosmeticsLayout({ children }: { children: React.ReactNode }) {
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
              { name: 'Free Cosmetics', path: '/free-cosmetics' },
            ])
          ),
        }}
      />
      {children}
    </>
  )
}
