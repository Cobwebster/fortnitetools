import type { Metadata } from 'next'
import { createMetadata, faqJsonLd } from '@/lib/seo'
import { SKIN_RARITY_FAQS } from '@/lib/skin-rarity-seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Skin Rarity Calculator',
  description:
    'Look up any Fortnite skin and see how rare it really is — shop appearances, last seen date, Battle Pass exclusives, and scarcity score. Includes a Black Knight rarity example.',
  path: '/tools/skin-rarity-calculator',
  keywords: [
    'fortnite rare skins',
    'fortnite skin rarity calculator',
    'how rare is my fortnite skin',
    'how rare is black knight fortnite',
    'fortnite og skins',
    'fortnite shop history',
    'rare fortnite skins 2026',
    'fortnite black knight rarity',
    'renegade raider rarity',
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(SKIN_RARITY_FAQS)) }}
      />
      {children}
    </>
  )
}
