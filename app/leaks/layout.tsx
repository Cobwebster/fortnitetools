import type { Metadata } from 'next'
import { createMetadata, faqJsonLd } from '@/lib/seo'
import { LEAKS_FAQS } from '@/lib/leaks'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Leaks – Treasure Hunters & Chapter 8 File Finds',
  description:
    'Fortnite leaks hub with individual write-ups: Pirate Shop Power Hours, Chapter 8 finishing moves, Sprite swaps, and past leaks that shipped. Status marked on every page — unconfirmed until Epic ships it.',
  path: '/leaks',
  keywords: [
    'fortnite leaks',
    'fortnite datamine',
    'pirate shop power hours',
    'fortnite chapter 8 leaks',
    'fortnite finishing moves',
    'treasure hunters leaks',
  ],
})

export default function LeaksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(LEAKS_FAQS)) }}
      />
      {children}
    </>
  )
}
