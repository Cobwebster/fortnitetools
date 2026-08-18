import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { STATUS_FAQS } from '@/lib/fortnite-status'

export const metadata: Metadata = createMetadata({
  title: 'Is Fortnite Down? Server Status, Queue & Season Reboot',
  description:
    'Honest Fortnite server status for reset week: Epic’s status board, lobby MOTDs, and the Season 4 countdown. No fake ping map. Queue is not the same as downtime. Last reviewed 18 Aug 2026.',
  path: '/status',
  keywords: [
    'is fortnite down',
    'fortnite servers',
    'fortnite downtime',
    'fortnite queue',
    'fortnite status',
    'fortnite server status',
    'fortnite reboot august 20',
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
