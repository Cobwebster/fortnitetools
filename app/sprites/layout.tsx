import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { SPRITE_COUNTS, SPRITES_FAQS } from '@/lib/sprites'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Sprites – All Chapter 7 Companion Icons',
  description: `Every Fortnite Sprite portrait (${SPRITE_COUNTS.total} companions across ${SPRITE_COUNTS.families} families): Jonesy, Gold, Cheat Master, Gummy, Galaxy, Cube, and collab variants.`,
  path: '/sprites',
  keywords: [
    'fortnite sprites',
    'fortnite sprite tracker',
    'fortnite jonesy sprite',
    'fortnite gold sprites',
    'fortnite cheat master sprites',
    'fortnite quack jonesy sprite',
    'how to get fortnite sprites',
    'chapter 7 sprites',
  ],
})

export default function SpritesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(SPRITES_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Sprites', path: '/sprites' },
            ])
          ),
        }}
      />
      {children}
    </>
  )
}
