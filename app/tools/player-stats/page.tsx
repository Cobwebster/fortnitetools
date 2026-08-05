import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PlayerStatsView } from '@/components/player-stats-view'
import { getFortniteApiKey } from '@/lib/fortnite-stats'
import type { StatsAccountType, StatsTimeWindow } from '@/lib/fortnite-stats'
import { createMetadata } from '@/lib/seo'
import { absoluteLocaleUrl, hreflangAlternates } from '@/i18n/pathnames'

const base = createMetadata({
  title: 'Fortnite Tracker & Stats Checker – K/D, Wins, Player Lookup',
  description:
    'Free Fortnite tracker and stats checker: look up any Epic username for K/D, wins, win rate, matches, kills, Solo/Duo/Squad breakdowns, and Battle Pass level.',
  path: '/tools/player-stats',
  keywords: [
    'fortnite tracker',
    'fortnite stats checker',
    'fortnite stats',
    'fortnite kd',
    'fortnite player lookup',
    'fortnite username lookup',
    'fortnite wins',
    'epic games stats',
    'fortnite career stats',
  ],
})

export const metadata: Metadata = {
  ...base,
  alternates: {
    canonical: absoluteLocaleUrl('en', '/tools/player-stats'),
    languages: hreflangAlternates('/tools/player-stats'),
  },
}

type Props = {
  searchParams: Promise<{ name?: string; accountType?: string; timeWindow?: string }>
}

export default async function PlayerStatsPage({ searchParams }: Props) {
  const params = await searchParams
  const configured = Boolean(getFortniteApiKey())
  const initialName = params.name?.trim() || ''
  const initialAccountType = (['epic', 'psn', 'xbl'].includes(params.accountType || '')
    ? params.accountType
    : 'epic') as StatsAccountType
  const initialTimeWindow = (['lifetime', 'season'].includes(params.timeWindow || '')
    ? params.timeWindow
    : 'lifetime') as StatsTimeWindow

  return (
    <>
      <Navbar />
      <PlayerStatsView
        initialName={initialName}
        initialAccountType={initialAccountType}
        initialTimeWindow={initialTimeWindow}
        configured={configured}
      />
      <Footer />
    </>
  )
}
