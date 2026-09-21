import Link from '@/components/link'
import { ArrowRight } from 'lucide-react'
import { FortniteIcon } from '@/components/fortnite-icon'
import { RankMedal } from '@/components/rank-medal'
import {
  formatBoardValue,
  loadStatsLeaderboard,
  type LeaderboardEntry,
} from '@/lib/stats-leaderboard'
import { toolIcon } from '@/lib/site-icons'

const PREVIEW_BOARDS = [
  { id: 'wins' as const, title: 'Wins', column: 'Wins' },
  { id: 'kills' as const, title: 'Kills', column: 'Kills' },
  { id: 'level' as const, title: 'BP Level', column: 'Level' },
]

function MiniBoard({
  title,
  column,
  boardId,
  rows,
}: {
  title: string
  column: string
  boardId: 'wins' | 'kills' | 'level' | 'time'
  rows: LeaderboardEntry[]
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background/60">
      <div className="border-b border-border px-3 py-2.5">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
          {title}
        </h3>
      </div>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border/80 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            <th className="px-3 py-1.5 font-bold">#</th>
            <th className="px-1 py-1.5 font-bold">Player</th>
            <th className="px-3 py-1.5 text-right font-bold">{column}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${boardId}-${row.accountId || row.name}`} className="border-b border-border/50 last:border-0">
              <td className="px-3 py-2">
                <RankMedal rank={row.rank} />
              </td>
              <td className="max-w-[8rem] truncate px-1 py-2 font-medium text-foreground">
                {row.name}
              </td>
              <td className="px-3 py-2 text-right font-semibold tabular-nums text-primary">
                {formatBoardValue(boardId, row.value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Homepage flex for our tracked player stats boards — EN-only presentational teaser. */
export async function StatsLeaderboardTeaser() {
  const snapshot = await loadStatsLeaderboard()
  if (!snapshot || snapshot.trackedCount === 0) return null

  const updated = new Date(snapshot.generatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  return (
    <section
      className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"
      aria-labelledby="stats-teaser-heading"
    >
      <div className="relative overflow-hidden rounded-2xl border border-primary/35 bg-card ring-1 ring-primary/15">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 80% at 0% 0%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 55%)',
          }}
        />
        <div className="relative flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div className="flex items-start gap-3">
            <FortniteIcon
              src={toolIcon('/stats')}
              alt="Player Stats"
              size="md"
              frameClassName="border-primary/40 bg-primary/10"
            />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                Our tracked database
              </p>
              <h2
                id="stats-teaser-heading"
                className="mt-1 font-display text-2xl font-bold uppercase tracking-tight text-foreground"
              >
                Player Stats Leaderboards
              </h2>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Season wins, kills, and Battle Pass levels among{' '}
                <strong className="font-semibold text-foreground">{snapshot.trackedCount}</strong>{' '}
                Epic accounts we poll ourselves via Fortnite-API — not a scraped third-party ladder.
                Snapshot {updated}.
              </p>
            </div>
          </div>
          <Link
            href="/stats"
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_color-mix(in_oklab,var(--primary)_35%,transparent)] transition-opacity hover:opacity-90 sm:self-auto"
          >
            Open full boards <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="relative grid gap-3 p-5 sm:grid-cols-3 sm:p-6">
          {PREVIEW_BOARDS.map((board) => (
            <MiniBoard
              key={board.id}
              title={board.title}
              column={board.column}
              boardId={board.id}
              rows={(snapshot.boards[board.id] || []).slice(0, 5)}
            />
          ))}
        </div>

        <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-4 sm:px-6">
          <p className="text-xs text-muted-foreground">
            Want on the boards?{' '}
            <Link
              href="/login?next=%2Faccount%3Frequest%3Dleaderboard"
              className="font-semibold text-primary hover:underline"
            >
              Request a track
            </Link>
            {' · '}
            <Link href="/tools/player-compare" className="font-semibold text-primary hover:underline">
              Compare two players
            </Link>
          </p>
          <Link
            href="/stats"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            See modes + full ranks <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
