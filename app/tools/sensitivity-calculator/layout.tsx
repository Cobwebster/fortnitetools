import type { Metadata } from 'next'
import { createMetadata, faqJsonLd } from '@/lib/seo'
import { SENSITIVITY_FAQS } from '@/lib/sensitivity-seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Sensitivity Calculator – Convert Valorant, CS2, Apex',
  description:
    'Free Fortnite sensitivity converter: match cm/360 from Valorant, CS2, Apex, Warzone, and more. See eDPI, common 800 DPI ranges, and how to fine-tune after converting.',
  path: '/tools/sensitivity-calculator',
  keywords: [
    'fortnite sensitivity calculator',
    'fortnite sens converter',
    'valorant to fortnite sensitivity',
    'cs2 to fortnite sensitivity',
    'apex to fortnite sensitivity',
    'fortnite eDPI',
    'fortnite cm/360',
    'fortnite mouse sensitivity',
    'convert sens to fortnite',
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(SENSITIVITY_FAQS)) }}
      />
      {children}
    </>
  )
}
