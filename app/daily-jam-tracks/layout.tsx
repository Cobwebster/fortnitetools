import type { Metadata } from 'next'
import { breadcrumbJsonLd, createMetadata, faqJsonLd } from '@/lib/seo'
import { JAM_TRACKS_FAQS } from '@/lib/jam-tracks'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Daily Jam Tracks – Today’s Festival Free Songs',
  description:
    'See today’s free Fortnite Festival Jam Tracks, countdown to the next UTC refresh, and play YouTube embeds for each song. New, featured, and recently rotated Music Library tracks.',
  path: '/daily-jam-tracks',
  keywords: [
    'fortnite daily jam tracks',
    'fortnite festival jam tracks today',
    'fortnite music library rotation',
    'fortnite festival free songs',
    'daily jam tracks fortnite',
    'fortnite festival youtube',
    'when do jam tracks refresh',
  ],
})

export default function DailyJamTracksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(JAM_TRACKS_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Daily Jam Tracks', path: '/daily-jam-tracks' },
            ])
          ),
        }}
      />
      {children}
    </>
  )
}
