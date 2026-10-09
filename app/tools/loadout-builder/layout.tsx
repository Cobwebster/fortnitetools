import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd, webApplicationJsonLd } from '@/lib/seo'
import { LOADOUT_FAQS } from '@/lib/loadout-seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Loadout Builder – Inventory, Mats & STK/TTK',
  description:
    'Plan a full Fortnite Override inventory: hotbar, wood/stone/metal, ammo, and heal stacks. Use Ranked, contest, Zero Build, and Fortnitemares presets, then share one link.',
  path: '/tools/loadout-builder',
  keywords: [
    'fortnite loadout builder',
    'fortnite best loadout',
    'fortnite hotbar',
    'fortnite inventory planner',
    'fortnite materials planner',
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
                'Plan a full Override inventory — hotbar, mats, ammo, heal stacks — with STK/TTK and shareable links.',
              path: '/tools/loadout-builder',
            })
          ),
        }}
      />
      {children}
    </>
  )
}
