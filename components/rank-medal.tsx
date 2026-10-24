const PLACE_ICON = [
  { src: '/images/icons/crown.png', label: 'Gold' },
  { src: '/images/icons/glider.png', label: 'Silver' },
  { src: '/images/icons/pickaxe.png', label: 'Bronze' },
] as const

/** Rank cell with Fortnite item icons for places 1–3. */
export function RankMedal({ rank }: { rank: number }) {
  if (rank >= 1 && rank <= 3) {
    const place = PLACE_ICON[rank - 1]
    return (
      <span className="inline-flex items-center gap-1.5" title={`${place.label} — #${rank}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={place.src} alt="" className="h-5 w-5 shrink-0 object-contain" aria-hidden="true" />
        <span className="tabular-nums font-semibold text-foreground">{rank}</span>
        <span className="sr-only">
          {place.label}, rank {rank}
        </span>
      </span>
    )
  }

  return <span className="tabular-nums text-muted-foreground">{rank}</span>
}
