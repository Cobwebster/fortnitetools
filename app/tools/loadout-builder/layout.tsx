import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd, webApplicationJsonLd } from '@/lib/seo'
import { LOADOUT_FAQS } from '@/lib/loadout-seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Loadout Builder – Treasure Hunters Inventory & STK/TTK',
  description:
    'Plan a full Treasure Hunters inventory: hotbar, wood/stone/metal, ammo, and heal stacks. Ranked, pubs Boss ship, Zero Build, and Sprite-hunt presets — then share one link.',
  path: '/tools/loadout-builder',
  keywords: [
    'fortnite loadout builder',
    'fortnite best loadout',
    'fortnite hotbar',
    'fortnite inventory planner',
    'fortnite materials planner',
    'treasure hunters loadout',
    'fortnite shock rocket loadout',
    'sentinel pump loadout',
    'fortnite hammer ar loadout',
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
                'Plan a full Treasure Hunters inventory — hotbar, mats, ammo, heal stacks — with STK/TTK and shareable links.',
              path: '/tools/loadout-builder',
            })
          ),
        }}
      />
      {children}
    </>
  )
}
