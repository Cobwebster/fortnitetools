import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { NEWS_FAQS } from '@/lib/fortnite-news'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite News – Live Lobby Headlines & Season Takes',
  description:
    'Live Fortnite Battle Royale lobby headlines for Override, with FortniteTools notes that link each tile to the map, shop, free cosmetics, and season countdown. Updates when Epic swaps the lobby tab.',
  path: '/news',
  keywords: [
    'fortnite news',
    'fortnite lobby news',
    'fortnite override news',
    'fortnite chapter 7 season 4',
    'fortnitemares news',
    'fortnite current events',
  ],
})

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(NEWS_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'News', path: '/news' },
            ])
          ),
        }}
      />
      {children}
    </>
  )
}
