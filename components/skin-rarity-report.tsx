import { RARITY_COLORS, type CosmeticItem } from '@/lib/fortnite-api'
import {
  SCARCITY_TIER_STYLES,
  formatShopDate,
  type SkinRarityReport,
} from '@/lib/skin-rarity'

function rarityClass(value: string) {
  return RARITY_COLORS[value.toLowerCase()] || RARITY_COLORS.common
}

function ScoreMeter({ score }: { score: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Scarcity score</p>
          <p className="font-display text-5xl font-bold text-foreground tabular-nums">{score}</p>
        </div>
        <p className="text-xs text-muted-foreground pb-1">0 common · 100 ultra scarce</p>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

export function SkinRarityReportPanel({
  item,
  report,
  eyebrow,
}: {
  item: CosmeticItem
  report: SkinRarityReport
  /** Optional label above the name (e.g. static example for SEO). */
  eyebrow?: string
}) {
  return (
    <article className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr]">
        <div className="relative aspect-square sm:aspect-auto sm:min-h-[200px] bg-muted/40 border-b sm:border-b-0 sm:border-r border-border">
          {item.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image}
              alt={`${item.name} Fortnite skin`}
              className="h-full w-full object-contain p-4"
            />
          ) : (
            <div className="flex h-full min-h-[160px] items-center justify-center text-sm text-muted-foreground">
              No image
            </div>
          )}
        </div>
        <div className="p-5 sm:p-6 space-y-5">
          <div>
            {eyebrow ? (
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-primary">{eyebrow}</p>
            ) : null}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`text-[10px] uppercase tracking-wider rounded px-1.5 py-0.5 border ${SCARCITY_TIER_STYLES[report.tier]}`}
              >
                {report.label}
              </span>
              <span
                className={`text-[10px] uppercase tracking-wider rounded px-1.5 py-0.5 border ${rarityClass(report.shopRarityValue)}`}
              >
                {report.shopRarity} tier
              </span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.type}</span>
            </div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              {item.name}
            </h2>
            {item.description ? (
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            ) : null}
          </div>

          <ScoreMeter score={report.score} />

          <p className="text-sm leading-relaxed text-foreground/90">{report.summary}</p>

          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: 'Shop appearances', value: String(report.appearances) },
              { label: 'First seen', value: formatShopDate(report.firstSeen) },
              { label: 'Last seen', value: formatShopDate(report.lastSeen) },
              {
                label: 'Days vaulted',
                value:
                  report.daysSinceLastSeen == null
                    ? report.neverInShop
                      ? 'Never sold'
                      : '—'
                    : String(report.daysSinceLastSeen),
              },
              { label: 'Source', value: report.sourceLabel },
              {
                label: 'Typical V-Bucks',
                value: report.typicalVbucks
                  ? report.typicalVbucks.toLocaleString()
                  : report.neverInShop
                    ? 'Not shop-priced'
                    : '—',
              },
            ].map((row) => (
              <div key={row.label} className="rounded-lg border border-border bg-background/50 px-3 py-2.5">
                <dt className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {row.label}
                </dt>
                <dd className="mt-0.5 text-sm font-semibold text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>

          {(item.introduction || item.set) && (
            <p className="text-xs text-muted-foreground">
              {item.introduction}
              {item.set ? `${item.introduction ? ' · ' : ''}Set: ${item.set}` : ''}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
