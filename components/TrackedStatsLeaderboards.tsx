import Link from '@/components/link'
import { RankMedal } from '@/components/rank-medal'
import {
  formatBoardValue,
  LEADERBOARD_BOARD_META,
  type StatsLeaderboardSnapshot,
} from '@/lib/stats-leaderboard'

export function TrackedStatsLeaderboards({
  snapshot,
}: {
  snapshot: StatsLeaderboardSnapshot | null
}) {
  if (!snapshot || snapshot.trackedCount === 0) {
    return (
      <section className="space-y-6">
        <div className="space-y-3 rounded-xl border border-dashed border-border bg-card/50 px-5 py-8">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
            Tracked player leaderboards
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            No snapshot yet. Run{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">npm run poll:stats-leaderboard</code>{' '}
            to poll Fortnite-API for names in{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">data/tracked-players.json</code>, then
            commit the generated file.
          </p>
        </div>
        <WantTrackedCta />
      </section>
    )
  }

  const updated = new Date(snapshot.generatedAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })

  return (
    <section className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
          Tracked sample · {snapshot.timeWindow}
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
          Player leaderboards
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Wins, kills, Battle Pass level, and time among{' '}
          <strong className="font-semibold text-foreground">{snapshot.trackedCount}</strong> Epic
          accounts we poll ourselves via Fortnite-API — not a scraped third-party board and not every
          player in the world. Add names to the seed list and re-poll to grow the sample.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Snapshot {updated}
          {snapshot.failedCount > 0
            ? ` · ${snapshot.failedCount} names skipped (private / missing)`
            : null}
          {' · '}
          <Link href="/tools/player-stats" className="font-semibold text-primary hover:underline">
            Look up any name
          </Link>
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {LEADERBOARD_BOARD_META.map((meta) => {
          const rows = snapshot.boards[meta.id] || []
          return (
            <div
              key={meta.id}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="border-b border-border px-4 py-3">
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                  {meta.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">{meta.blurb}</p>
              </div>
              {rows.length === 0 ? (
                <p className="px-4 py-6 text-sm text-muted-foreground">No rows yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[280px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-border text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        <th className="px-4 py-2 font-bold">#</th>
                        <th className="px-2 py-2 font-bold">Player</th>
                        <th className="px-4 py-2 text-right font-bold">{meta.column}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.slice(0, 10).map((row) => (
                        <tr
                          key={`${meta.id}-${row.accountId || row.name}`}
                          className="border-b border-border/70 last:border-0"
                        >
                          <td className="px-4 py-2.5">
                            <RankMedal rank={row.rank} />
                          </td>
                          <td className="max-w-[12rem] truncate px-2 py-2.5 font-medium text-foreground">
                            <Link
                              href={`/tools/player-stats?name=${encodeURIComponent(row.name)}`}
                              className="hover:text-primary hover:underline"
                            >
                              {row.name}
                            </Link>
                          </td>
                          <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-primary">
                            {formatBoardValue(meta.id, row.value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <WantTrackedCta trackedCount={snapshot.trackedCount} />
    </section>
  )
}

function WantTrackedCta({ trackedCount }: { trackedCount?: number }) {
  const next = encodeURIComponent('/account?request=leaderboard')
  return (
    <aside
      className="relative overflow-hidden rounded-2xl border border-primary/45 bg-card p-6 ring-1 ring-primary/25 sm:p-8"
      aria-labelledby="want-tracked-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 0% 0%, color-mix(in oklab, var(--primary) 28%, transparent), transparent 55%), radial-gradient(ellipse 50% 60% at 100% 100%, color-mix(in oklab, #38bdf8 14%, transparent), transparent 50%)',
        }}
      />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-primary">
            Open submissions
          </p>
          <h3
            id="want-tracked-heading"
            className="mt-2 font-display text-3xl font-extrabold uppercase tracking-wide text-foreground sm:text-4xl"
          >
            Want your name <span className="text-primary">tracked?</span>
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            These boards are a living sample we poll ourselves
            {typeof trackedCount === 'number' ? ` (${trackedCount} accounts right now)` : ''}.
            Sign in, open account feedback, and send your exact Epic display name — we review
            requests and add public profiles to the next poll.
          </p>
          <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="font-bold text-primary">1.</span>
              Create or sign in to a FortniteTools account
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-primary">2.</span>
              Submit feedback with type “Leaderboard — track my name”
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-primary">3.</span>
              We poll Fortnite-API and refresh the ranked tables
            </li>
          </ul>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <Link
            href={`/login?next=${next}`}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-black uppercase tracking-wider text-primary-foreground shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_40%,transparent)] transition-opacity hover:opacity-90"
          >
            Request a track
          </Link>
          <Link
            href={`/register?next=${next}`}
            className="text-center text-xs font-semibold text-primary hover:underline sm:text-right"
          >
            New here? Create an account
          </Link>
          <Link
            href="/account?request=leaderboard"
            className="text-center text-xs text-muted-foreground hover:text-primary hover:underline sm:text-right"
          >
            Already signed in? Open feedback
          </Link>
        </div>
      </div>
    </aside>
  )
}
