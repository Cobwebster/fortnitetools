import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { CREATOR_CODE_FAQS } from '@/lib/creator-code'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Creator Code Checker – Support-A-Creator Lookup',
  description:
    'Look up a Fortnite Support-A-Creator code to see if it is ACTIVE and which Epic account it maps to. Gift-card PINs are a different system — this is not a V-Bucks redeem tool.',
  path: '/creator-code',
  keywords: [
    'fortnite creator code',
    'support a creator code checker',
    'fortnite creator code lookup',
    'is my fortnite creator code active',
    'fortnite enter creator code',
  ],
})

export default function CreatorCodeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(CREATOR_CODE_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Creator Code', path: '/creator-code' },
            ])
          ),
        }}
      />
      {children}
    </>
  )
}
