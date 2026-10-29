import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { FREE_COSMETIC_OFFERS } from '@/lib/free-cosmetics'

export const metadata: Metadata = createMetadata({
  title: 'Free Fortnite Cosmetics – Fortnitemares, Admin Panel & Ranked',
  description: `Track ${FREE_COSMETIC_OFFERS.length}+ free Fortnite cosmetics in Override: Fortnitemares Jack-a-Nape quests, Jimothy Sidekick, Admin Panel Lobby Hacks, Ranked Null, Battle Pass free track, and account rewards with end dates.`,
  path: '/free-cosmetics',
  keywords: [
    'free fortnite cosmetics',
    'free fortnite skins',
    'fortnite free rewards',
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
    question: 'How do I get free Fortnite cosmetics in Override?',
    answer:
      'Fortnitemares Nitemare quests (Jack-a-Nape through 31 Oct), Jimothy Sidekick extract, Safety in Numbers / Cuddlz on Horror Creative islands, Prophetic Tapestry login, Admin Panel Lobby Hack codes, Ranked Null styles, Battle Pass free track, and evergreen account rewards (2FA, LEGO link, MyDisney). This page lists methods with end dates.',
  },
  {
    question: 'Do free Fortnite rewards expire?',
    answer:
      'Many do — Fortnitemares ends 31 October 2026; Twitch drops and seasonal quests have hard cutoffs. Admin Panel / Ranked / free pass track generally last until Override ends (1 November 2026). Ongoing offers like 2FA Boogie Down have no deadline.',
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
