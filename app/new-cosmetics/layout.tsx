import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'

const faqs = [
  {
    question: 'What counts as a “new” Fortnite cosmetic?',
    answer:
      'Anything Fortnite-API lists on /v2/cosmetics/new for the current game build — outfits, emotes, jam tracks, cars, and more. It is not the same as “in the Item Shop tonight.”',
  },
  {
    question: 'Can I buy these from this page?',
    answer:
      'No. Open a tile for details and shop history. If it is in today’s rotation, the Item Shop tracker shows the V-Bucks price.',
  },
  {
    question: 'Why is a leaked item here before it is in the shop?',
    answer:
      'Epic often ships cosmetics in a pak before they go on sale. New ≠ purchasable. Treat unreleased rows as files, not a store listing.',
  },
]

export const metadata: Metadata = createMetadata({
  title: 'New Fortnite Cosmetics – Latest Skins, Emotes & More',
  description:
    'Newly added Fortnite cosmetics from the current game build: outfits, emotes, pickaxes, jam tracks, and cars. Click any item for rarity, set, and shop history.',
  path: '/new-cosmetics',
  keywords: [
    'new fortnite skins',
    'new fortnite cosmetics',
    'fortnite leaked skins',
    'fortnite new emotes',
    'latest fortnite skins',
  ],
})

export default function NewCosmeticsLayout({ children }: { children: React.ReactNode }) {
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
              { name: 'New Cosmetics', path: '/new-cosmetics' },
            ])
          ),
        }}
      />
      {children}
    </>
  )
}
