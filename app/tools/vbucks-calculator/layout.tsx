import type { Metadata } from 'next'
import { createMetadata, faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite V-Bucks Calculator',
  description:
    'Plan V-Bucks purchases for skins and the Battle Pass. Compare pack value and estimate a low-cost pack combination.',
  path: '/tools/vbucks-calculator',
  keywords: [
    'fortnite vbucks calculator',
    'v-bucks calculator',
    'best vbucks deal',
    'fortnite item shop cost',
  ],
})

const faqs = [
  {
    question: 'How does the V-Bucks calculator find the cheapest packs?',
    answer:
      'It searches pack combinations that cover your wishlist total using common USD storefront prices, then picks a low total cost. Regional prices and sales can differ.',
  },
  {
    question: 'Are Item Shop prices always accurate?',
    answer:
      'Wishlist prices are user-entered references for common cosmetic tiers. Always confirm the live Item Shop price in-game before buying.',
  },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      {children}
    </>
  )
}
