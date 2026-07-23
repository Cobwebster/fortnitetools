import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd, webApplicationJsonLd } from '@/lib/seo'
import { LOADOUT_FAQS } from '@/lib/loadout-seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Loadout Builder – Best C7S3 Hotbar (STK/TTK)',
  description:
    'Build and share a Fortnite Chapter 7 Season 3 loadout: shotgun, AR, SMG, heals, and mobility with real item icons. Compare STK/TTK, then copy a shareable hotbar link for teammates.',
  path: '/tools/loadout-builder',
  keywords: [
    'fortnite loadout builder',
    'fortnite best loadout',
    'fortnite hotbar',
    'chapter 7 season 3 loadout',
    'fortnite shotgun ar smg',
    'extending focus loadout',
    'striker pump loadout',
    'fortnite ttk',
    'fortnite stk',
    'shattered coast loadout',
    'fortnite share loadout',
    'fortnite loadout link',
    'runners season weapons',
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
                'Chapter 7 Season 3 Fortnite loadout planner with real item icons and STK/TTK estimates for shotgun, AR, SMG, heals, and mobility.',
              path: '/tools/loadout-builder',
            })
          ),
        }}
      />
      {children}
    </>
  )
}
