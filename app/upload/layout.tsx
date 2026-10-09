import type { Metadata } from 'next'
import { createMetadata, breadcrumbJsonLd, webApplicationJsonLd } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Community Uploads – Player Guides, Loadouts & More',
  description:
    'Submit Fortnite player guides (YouTube & socials welcome) plus loadouts, drop spots, Creative codes, settings, tips, and clips. Free public feed — sign in to post.',
  path: '/upload',
  keywords: [
    'fortnite community guides',
    'fortnite player guides',
    'fortnite youtube guide submit',
    'fortnite community',
    'fortnite loadout share',
    'fortnite map codes submit',
    'fortnite tips',
    'fortnite settings share',
    'fortnite drop spots',
  ],
})

export default function UploadLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Community Uploads', path: '/upload' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationJsonLd({
              name: 'FortniteTools Community Uploads',
              description:
                'Submit Fortnite guides and loadouts for review. Verified posts publish on the community feed.',
              path: '/upload',
            })
          ),
        }}
      />
      {children}
    </>
  )
}
