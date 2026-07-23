import type { Metadata } from 'next'
import { createMetadata, faqJsonLd } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Sensitivity Calculator',
  description:
    'Convert mouse sensitivity from Valorant, CS2, Apex, Warzone, and more into Fortnite using cm/360 as a starting point.',
  path: '/tools/sensitivity-calculator',
  keywords: [
    'fortnite sensitivity calculator',
    'fortnite sens converter',
    'fortnite to valorant sensitivity',
    'fortnite eDPI',
  ],
})

const faqs = [
  {
    question: 'Will converted sensitivity feel identical in Fortnite?',
    answer:
      'cm/360 matching is a strong starting point, but building and editing often need fine-tuning in Creative after you convert.',
  },
  {
    question: 'What eDPI range do Fortnite players use?',
    answer:
      'Many mouse players land roughly in the 40–100 eDPI range (sensitivity × DPI), then adjust for comfort. There is no single correct value.',
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
