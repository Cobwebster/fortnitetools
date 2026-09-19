import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd, webApplicationJsonLd } from '@/lib/seo'
import { LOADOUT_FAQS } from '@/lib/loadout-seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Loadout Builder – Override Hotbar (STK/TTK)',
  description:
    'Build and share a Fortnite Chapter 7 Season 4 (Override) loadout: shotgun, AR, sidearm, heals, and mobility with item icons. Compare STK/TTK, then copy a shareable hotbar link.',
  path: '/tools/loadout-builder',
  keywords: [
    'fortnite loadout builder',
    'fortnite best loadout',
    'fortnite hotbar',
    'chapter 7 season 4 loadout',
    'fortnite override loadout',
    '8-bit shotgun loadout',
    'fortnite pump shotgun loadout',
    'fortnite ttk',
    'fortnite stk',
    'fortnite share loadout',
    'fortnite loadout link',
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(LOADOUT_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Tools', path: '/tools' },
              { name: 'Loadout Builder', path: '/tools/loadout-builder' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationJsonLd({
              name: 'Fortnite Loadout Builder',
              description:
                'Plan an Override hotbar with STK/TTK estimates and share a loadout link with teammates.',
              path: '/tools/loadout-builder',
            })
          ),
        }}
      />
      {children}
    </>
  )
}
