import type { Metadata } from 'next'
import { breadcrumbJsonLd, createMetadata, faqJsonLd, webApplicationJsonLd } from '@/lib/seo'
import { ITEM_SHOP_FAQS } from '@/lib/item-shop-seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Item Shop Today – Skins, Emotes & Cosmetic Viewer',
  description:
    'Browse today’s Fortnite Item Shop with live V-Bucks prices, full outfit sets, style variants, emote dance videos, and a searchable catalog of every cosmetic — including newly added and incoming items.',
  path: '/tools/item-shop',
  keywords: [
    'fortnite item shop',
    'fortnite shop today',
    'fortnite skins',
    'fortnite emotes',
    'fortnite dance emotes',
    'fortnite cosmetic viewer',
    'fortnite outfit sets',
    'fortnite new cosmetics',
    'fortnite shop tracker',
    'vbucks shop',
    'fortnite leaked skins',
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  const crumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Item Shop', path: '/tools/item-shop' },
  ])
  const app = webApplicationJsonLd({
    name: 'Fortnite Item Shop & Cosmetic Viewer',
    description:
      'Live Fortnite Item Shop tracker and full cosmetic browser with set views, emote videos, and V-Bucks prices.',
    path: '/tools/item-shop',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(ITEM_SHOP_FAQS)) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }} />
      {children}
    </>
  )
}
