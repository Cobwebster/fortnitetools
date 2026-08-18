import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { RELOAD_FAQS } from '@/lib/reload-hub'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Reload – What It Is, vs BR & Blitz, Current Islands',
  description:
    'Fortnite Reload explained: respawn BR on rotating small islands (Oasis, Slurp Rush, Springfield), how it differs from Battle Royale and Blitz, Ranked Reload, and when to queue each map. Last reviewed 18 Aug 2026. The live clock lives on the map rotation timer.',
  path: '/reload',
  keywords: [
    'fortnite reload',
    'what is fortnite reload',
    'fortnite reload vs battle royale',
    'fortnite reload vs blitz',
    'fortnite reload maps',
    'ranked reload',
    'oasis slurp rush springfield',
  ],
})

export default function ReloadLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(RELOAD_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Reload', path: '/reload' },
            ])
          ),
        }}
      />
      {children}
    </>
  )
}
