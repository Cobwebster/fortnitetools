import { Medal } from 'lucide-react'

const MEDAL_TONE = [
  'text-amber-400', // 1 — gold
  'text-slate-300', // 2 — silver
  'text-amber-700', // 3 — bronze
] as const

const MEDAL_LABEL = ['Gold', 'Silver', 'Bronze'] as const

/** Rank cell with medal icons for places 1–3. */
export function RankMedal({ rank }: { rank: number }) {
  if (rank >= 1 && rank <= 3) {
    const tone = MEDAL_TONE[rank - 1]
    return (
      <span className="inline-flex items-center gap-1.5" title={`${MEDAL_LABEL[rank - 1]} — #${rank}`}>
        <Medal className={`h-4 w-4 shrink-0 ${tone}`} aria-hidden="true" strokeWidth={2.25} />
        <span className="tabular-nums font-semibold text-foreground">{rank}</span>
        <span className="sr-only">
          {MEDAL_LABEL[rank - 1]} medal, rank {rank}
        </span>
      </span>
    )
  }

  return <span className="tabular-nums text-muted-foreground">{rank}</span>
}
