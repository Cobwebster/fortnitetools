import type { Metadata } from 'next'
import { createMetadata, faqJsonLd } from '@/lib/seo'
import { LEAKS_FAQS } from '@/lib/leaks'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Leaks – Collabs, Winterfest & Chapter 8 File Finds',
  description:
    'Fortnite leaks hub: Doki Doki, Scott Pilgrim, Puss in Boots collab chatter, Winterfest dates, Pirate Shop, and Chapter 8 file finds. Status marked on every page.',
  path: '/leaks',
  keywords: [
    'fortnite leaks',
    'fortnite datamine',
    'doki doki fortnite',
    'scott pilgrim fortnite',
    'puss in boots fortnite',
    'fortnite winterfest 2026',
    'fortnite chapter 8 leaks',
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
