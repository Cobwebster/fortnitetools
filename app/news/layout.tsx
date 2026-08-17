import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { NEWS_FAQS } from '@/lib/fortnite-news'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite News – Live Lobby MOTDs & Season Headlines',
  description:
    'Current Fortnite Battle Royale lobby news (MOTDs) with FortniteTools notes that link the tiles to the map, shop, weapons, and season countdown. Updates when Epic swaps the news tab.',
  path: '/news',
  keywords: [
    'fortnite news',
    'fortnite lobby news',
    'fortnite motd',
    'fortnite chapter 7 season 4',
    'fortnite runners news',
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
