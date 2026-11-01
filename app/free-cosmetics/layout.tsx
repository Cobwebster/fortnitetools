import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { FREE_COSMETIC_OFFERS } from '@/lib/free-cosmetics'

export const metadata: Metadata = createMetadata({
  title: 'Free Fortnite Cosmetics – Pirate Shop, Fortnitemares & Ranked',
  description: `Track ${FREE_COSMETIC_OFFERS.length}+ free Fortnite cosmetics: Treasure Hunters Pirate Shop Access, Fortnitemares Jack-a-Nape quests, Jimothy Sidekick, Admin Panel Lobby Hacks, Ranked Null, Battle Pass free track, and account rewards with end dates.`,
  path: '/free-cosmetics',
  keywords: [
    'free fortnite cosmetics',
    'free fortnite skins',
    'fortnite free rewards',
    'pirate shop access fortnite',
    'fortnite pirate shop',
    'fortnitemares 2026 free rewards',
    'jack-a-nape fortnite',
    'cuddlz fortnite',
    'safety in numbers fortnite',
    'fortnite jimothy',
    'fortnite twitch drops',
    'fortnite admin panel codes',
    'fortnite lobby hack codes',
    'fortnite ranked free rewards',
    'how to get free fortnite cosmetics',
    'fortnite free battle pass rewards',
    'fortnite 2fa emote',
  ],
})

const faqs = [
  {
    question: 'How do I get free Fortnite cosmetics in Treasure Hunters?',
    answer:
      'Pirate Shop Access (rare BR chests — 14-day V-Bucks Item Shop claims), Sprite Mastery (Navigator’s Nosedive at 40), the new ranked track (Par-Rot / Double-Duty Duelist), plus leftover Fortnitemares / Override rows that already locked. Evergreen: 2FA Boogie Down, LEGO link, MyDisney.',
  },
  {
    question: 'Do free Fortnite rewards expire?',
    answer:
      'Yes. Fortnitemares / Null / Override free-track locked 31 Oct–1 Nov 2026. Treasure Hunters ranked and Sprite Mastery follow the season (this site uses 5 December, the Chapter 7 end event Epic printed). 2FA Boogie Down has no deadline.',
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
