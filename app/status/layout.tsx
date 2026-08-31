import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { STATUS_FAQS } from '@/lib/fortnite-status'

export const metadata: Metadata = createMetadata({
  title: 'Is Fortnite Down? Server Status, Queue & Season Countdown',
  description:
    'Honest Fortnite server status for Override: Epic’s status board, lobby MOTDs, and the Chapter 7 Season 4 countdown to November 1, 2026. No fake ping map. Queue is not downtime. Last reviewed 31 Aug 2026.',
  path: '/status',
  keywords: [
    'is fortnite down',
    'fortnite servers',
    'fortnite downtime',
    'fortnite queue',
    'fortnite status',
    'fortnite server status',
    'fortnite override',
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
