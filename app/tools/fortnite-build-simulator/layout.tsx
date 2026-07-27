import type { Metadata } from 'next'
import { createMetadata, faqJsonLd, breadcrumbJsonLd, webApplicationJsonLd } from '@/lib/seo'
import { BUILD_SIM_FAQS } from '@/lib/build-simulator-seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Build Simulator – Free Browser Building Practice',
  description:
    'Free Fortnite build trainer in your browser: turbo-build walls, floors, ramps, and cones, edit 3×3 tiles, break pieces, mats, and FPS movement. Warm up building & editing — not affiliated with Epic.',
  path: '/tools/fortnite-build-simulator',
  keywords: [
    'fortnite build simulator',
    'fortnite building practice',
    'fortnite build trainer',
    'practice fortnite building',
    'fortnite edit practice browser',
    'fortnite turbo build practice',
    'browser fortnite builder',
    'fortnite walls ramps cones',
    'fortnite mats practice',
    'fortnite piece control trainer',
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(BUILD_SIM_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Tools', path: '/tools' },
              { name: 'Build Simulator', path: '/tools/fortnite-build-simulator' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationJsonLd({
              name: 'Fortnite Build Simulator',
              description:
                'Free in-browser Fortnite build trainer: turbo-build, edit tiles, break pieces, mats, and first-person movement for warm-ups.',
              path: '/tools/fortnite-build-simulator',
            })
          ),
        }}
      />
      {children}
    </>
  )
}
