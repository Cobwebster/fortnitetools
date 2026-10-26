import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { STATUS_FAQS } from '@/lib/fortnite-status'

export const metadata: Metadata = createMetadata({
  title: 'Is Fortnite Down? Live Server Status & Season Countdown',
  description:
    'Live Fortnite server status for Override → Treasure Hunters: Epic’s board as Online / Issues / Down, lobby downtime headlines, and a countdown to 1 November 2026. No fake ping map. Queue is not downtime.',
  path: '/status',
  keywords: [
    'is fortnite down',
    'fortnite servers',
    'fortnite downtime',
    'fortnite queue',
    'fortnite status',
    'fortnite server status',
    'fortnite override',
    'fortnite treasure hunters',
    'fortnite november 1 downtime',
  ],
})

export default function StatusLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(STATUS_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Status', path: '/status' },
            ])
          ),
        }}
      />
      {children}
    </>
  )
}
