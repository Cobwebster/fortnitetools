import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { LOBBY_HACK_COUNTS, LOBBY_HACKS_FAQS } from '@/lib/lobby-hacks'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Lobby Hacks – Admin Panel Codes (Override)',
  description: `Click to copy ${LOBBY_HACK_COUNTS.total} Override Admin Panel Lobby Hack codes — Sprites, XP, Sprite Dust, loading screens, and lobby effects. Marks used in this browser. Never V-Bucks.`,
  path: '/lobby-hacks',
  keywords: [
    'fortnite lobby hacks',
    'fortnite admin panel codes',
    'fortnite lobby hack codes',
    'fortnite cheat codes',
    'override lobby hacks',
    'fortnite sprite codes',
    'fortnite admin panel',
    'gotta go fast fortnite',
    'override xp code',
  ],
})

export default function LobbyHacksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(LOBBY_HACKS_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Lobby Hacks', path: '/lobby-hacks' },
            ])
          ),
        }}
      />
      {children}
    </>
  )
}
