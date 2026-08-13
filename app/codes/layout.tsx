import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { CREATIVE_CODES_FAQS } from '@/lib/creative-codes-seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite XP Map Codes & Creative Island Codes',
  description:
    'Working Fortnite Creative map codes with Discover thumbnails — XP farms, horror, 1v1s, tycoons, deathruns. Copy a code and paste it in Discover.',
  path: '/codes',
  keywords: [
    'fortnite map codes',
    'fortnite xp map codes',
    'best fortnite xp maps',
    'fortnite horror map codes',
    'fortnite 1v1 map codes',
    'fortnite tycoon codes',
    'fortnite escape room codes',
    'fortnite creative codes',
    'fortnite island codes',
    'fortnite deathrun codes',
  ],
})

export default function CodesLayout({ children }: { children: React.ReactNode }) {
  const crumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Creative Map Codes', path: '/codes' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(CREATIVE_CODES_FAQS)) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Fortnite Creative Map Codes',
            url: `${siteConfig.url}/codes`,
            applicationCategory: 'GameApplication',
            description:
              'Searchable database of Fortnite Creative island codes by genre, XP rating, and player count.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      {children}
    </>
  )
}
