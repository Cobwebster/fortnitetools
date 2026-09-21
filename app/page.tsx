import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { HomePageContent } from '@/components/home-page-content'
import { StatsLeaderboardTeaser } from '@/components/stats-leaderboard-teaser'
import { hreflangAlternates, absoluteLocaleUrl } from '@/i18n/pathnames'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  alternates: {
    canonical: absoluteLocaleUrl('en', '/'),
    languages: hreflangAlternates('/'),
  },
  openGraph: {
    url: siteConfig.url,
  },
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HomePageContent statsTeaser={<StatsLeaderboardTeaser />} />
      <Footer />
    </>
  )
}
