import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PlayerStatsView } from '@/components/player-stats-view'
import { getFortniteApiKey } from '@/lib/fortnite-stats'
import type { StatsAccountType, StatsTimeWindow } from '@/lib/fortnite-stats'
import {
  assertPrefixedLocale,
  generateToolLocaleMetadata,
} from '@/i18n/tool-metadata'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ name?: string; accountType?: string; timeWindow?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return generateToolLocaleMetadata(locale, 'player-stats')
}

export default async function LocalePlayerStatsPage({ params, searchParams }: Props) {
  const { locale } = await params
  assertPrefixedLocale(locale)

  const sp = await searchParams
  const configured = Boolean(getFortniteApiKey())
  const initialName = sp.name?.trim() || ''
  const initialAccountType = (['epic', 'psn', 'xbl'].includes(sp.accountType || '')
    ? sp.accountType
    : 'epic') as StatsAccountType
  const initialTimeWindow = (['lifetime', 'season'].includes(sp.timeWindow || '')
    ? sp.timeWindow
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
