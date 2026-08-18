import { formatSeasonLongDate, getSeasonCountdown, nextSeasonStartDate } from '@/lib/season'
import type { NewsMotd } from '@/lib/fortnite-news'

export const STATUS_REVIEWED = '18 Aug 2026'

export type EpicStatusPayload = {
  indicator: 'none' | 'minor' | 'major' | 'critical' | 'maintenance' | string
  description: string
  updatedAt: string | null
  components: { name: string; status: string }[]
  incidents: { name: string; status: string; createdAt: string | null }[]
  ok: boolean
}

const INDICATOR_LABEL: Record<string, string> = {
  none: 'Epic’s board says all systems operational',
  minor: 'Epic’s board: minor issues',
  major: 'Epic’s board: major outage',
  critical: 'Epic’s board: critical outage',
  maintenance: 'Epic’s board: maintenance',
}

export function indicatorCopy(indicator: string, description: string) {
  return INDICATOR_LABEL[indicator] || description || 'Epic status page responded, but the indicator was blank.'
}

export async function fetchEpicStatus(): Promise<EpicStatusPayload> {
  try {
    const res = await fetch('https://status.epicgames.com/api/v2/summary.json', {
      next: { revalidate: 60 },
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) {
      return {
        indicator: 'unknown',
        description: `Epic status page returned HTTP ${res.status}. Open status.epicgames.com directly.`,
        updatedAt: null,
        components: [],
        incidents: [],
        ok: false,
      }
    }
    const json = await res.json()
    const components = Array.isArray(json.components)
      ? (json.components as { name?: string; status?: string; group_id?: string | null }[])
          .filter((c) => c.name && !c.group_id)
          .slice(0, 12)
          .map((c) => ({ name: c.name as string, status: (c.status || 'unknown').replace(/_/g, ' ') }))
      : []
    const incidents = Array.isArray(json.incidents)
      ? (json.incidents as { name?: string; status?: string; created_at?: string }[])
          .filter((i) => i.name)
          .slice(0, 5)
          .map((i) => ({
            name: i.name as string,
            status: i.status || 'investigating',
            createdAt: i.created_at || null,
          }))
      : []
    return {
      indicator: (json.status?.indicator as string) || 'none',
      description: (json.status?.description as string) || '',
      updatedAt: json.page?.updated_at || json.status?.updated_at || null,
      components,
      incidents,
      ok: true,
    }
  } catch {
    return {
      indicator: 'unknown',
      description: 'Could not reach status.epicgames.com from this server. That is not the same as Fortnite being down.',
      updatedAt: null,
      components: [],
      incidents: [],
      ok: false,
    }
  }
}

export function formatEpicUpdated(iso: string | null) {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(d)
}

export function countdownStatusLine(now = new Date()) {
  const c = getSeasonCountdown(now)
  if (c.ended) {
    return 'The C7S3 countdown has elapsed. If the lobby is a queue or a patcher, that is reboot downtime — not a mystery outage we can ping-map.'
  }
  return `${c.days}d ${c.hours}h ${c.minutes}m left on the season timer we publish (${formatSeasonLongDate(nextSeasonStartDate())} UTC). Exact maintenance can shift a few hours.`
}

const DOWNTIME_RE =
  /reboot|downtime|maintenance|server|queue|august 20|season 4|chapter 7 season 4|reality reboot|coming soon|update/i

/** Prefer MOTDs that actually mention reboot / downtime; otherwise show the latest lobby tiles so the page is not empty. */
export function pickStatusMotds(motds: NewsMotd[]) {
  const hits = motds.filter((m) => DOWNTIME_RE.test(`${m.title} ${m.body}`))
  return (hits.length ? hits : motds).slice(0, 4)
}

export const STATUS_RESET_WEEK = [
  {
    title: 'Scheduled reboot ≠ “Fortnite is down”',
    body: 'Every season flip has a maintenance window. The client will sit on a queue or a patcher. That is Epic taking the shard down on purpose. We will not paint a red world map because Twitter says “servers.”',
  },
  {
    title: 'Queue is not an outage',
    body: 'A progress bar after “Reality Reboots August 20” is matchmaking load. Third-party sites do not get your queue position. Refresh Epic’s board, this page, and the countdown. Buying a VPN does nothing.',
  },
  {
    title: 'What we can actually see',
    body: 'Epic’s public status JSON, the same lobby MOTDs as the news page, and the season timestamp we already publish. We cannot see your ping, your NAT, or whether NA-East is worse than EU.',
  },
] as const

export const WHAT_WE_DONT_SHOW = [
  {
    title: 'No fake ping map',
    body: 'Green dots over cities look official and are usually player-reported guesses or recycled from other games. If you have packet loss in-match, that is a you-to-server problem — use the packet-loss guide.',
  },
  {
    title: 'No invented queue API',
    body: 'There is no public “players in queue” feed. If a site shows 184,221 people waiting, they made it up or scraped a screenshot.',
  },
  {
    title: 'File playlists ≠ live health',
    body: 'The modes catalog is game-file data. A Ranked Solo row can exist in files while Discover is empty. Trust the lobby for “is the queue up.” Trust Epic’s board for “is the platform up.”',
  },
] as const

export const STATUS_CHECKS = [
  {
    title: 'Epic’s own status board',
    body: 'status.epicgames.com is what Epic publishes for Fortnite, the Epic Games Store, accounts, and related services. If that board is green and you still cannot play, the problem is more often your ISP, console network, or a local queue — not a global outage we can invent a ping map for.',
  },
  {
    title: 'Lobby news (MOTDs)',
    body: 'When Epic is about to take the game down for a season reboot, the news tab usually says so days ahead (“Reality Reboots August 20”). That is a scheduled downtime headline, not a live outage flag. We load the same tiles as the lobby.',
  },
  {
    title: 'Season countdown',
    body: `Chapter 7 Season 4 is dated ${formatSeasonLongDate(nextSeasonStartDate())} UTC. Expect a maintenance window around that flip. Exact queue length is not a public API — if the client says “servers are busy,” believe the client.`,
  },
] as const

export const YOU_VS_EPIC = [
  {
    symptom: 'Everyone on Twitter / Discord says down, Epic board is red',
    likely: 'Real outage or maintenance. Wait. Don’t uninstall. Don’t buy a VPN “fix.”',
  },
  {
    symptom: 'Epic board is green, only you (or your stack) fail to matchmake',
    likely: 'NAT, DNS, console network, or a regional blip. Try a different network. Packet-loss guide is on this site — we still cannot see your ping from here.',
  },
  {
    symptom: 'Stuck on “connecting” after a season reboot clock',
    likely: 'Queue. Reboots take minutes to a few hours. Refresh this page, the countdown, and Epic’s board. Queue position is not something third-party sites get as a feed.',
  },
  {
    symptom: 'Shop works, BR doesn’t (or the reverse)',
    likely: 'A single service can fail. Look at the component list from Epic’s board below — Store vs Fortnite vs login are different rows when they publish them.',
  },
  {
    symptom: 'Creative / Reload up, ranked BR down',
    likely: 'Possible during a playlist-only issue. Check Discover in-game. Our modes catalog is file data, not live matchmaking health.',
  },
] as const

export const STATUS_FAQS = [
  {
    question: 'Is Fortnite down right now?',
    answer:
      'Check Epic’s status board first (embedded below from status.epicgames.com). Then check whether the lobby news mentions scheduled downtime. This site does not run a fake world ping map — we cannot see your connection.',
  },
  {
    question: 'When is the Chapter 7 Season 4 downtime?',
    answer: `The season end / S4 start timestamp we use is ${formatSeasonLongDate(nextSeasonStartDate())} (UTC). The lobby MOTD says “Reality Reboots August 20.” Downtime can shift by a few hours. Use the countdown; treat this page as the “is it servers or me” checklist.`,
  },
  {
    question: 'Why do other sites show a green ping map?',
    answer:
      'Those are usually player-reported or guessed. They look official and are often wrong for your city. We refuse to fake that. If you have packet loss in-match, use the ping/packet-loss guide — that is a you-to-server problem, not an Epic status flag.',
  },
  {
    question: 'The game is up but queues are long. Is that “down”?',
    answer:
      'No. Queue is matchmaking load, especially after a reboot or a free weekend. Down means login, matchmaking, or the client cannot reach Epic. Long queue with a progress bar is the game working badly, not a status-page outage.',
  },
  {
    question: 'Should I restart my router?',
    answer:
      'If Epic’s board is green and a friend on another ISP is in-game, yes — try network basics. If the board is red or the MOTD says maintenance, restarting your router does nothing.',
  },
]
