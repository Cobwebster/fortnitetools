import Link from '@/components/link'
import {
  COMMUNITY_KIND_META,
  GUIDE_CATEGORY_LABELS,
  formatSubmissionDate,
  payloadString,
  type CommunitySubmission,
  type GuideCategory,
} from '@/lib/community-submissions'
import { previewFromLoadoutUrl } from '@/lib/loadout-preview'

const SOCIAL_KEYS = [
  { key: 'youtube', label: 'YouTube' },
  { key: 'twitch', label: 'Twitch' },
  { key: 'tiktok', label: 'TikTok' },
  { key: 'twitter', label: 'X / Twitter' },
  { key: 'discord', label: 'Discord' },
  { key: 'website', label: 'Website' },
] as const

export function UploadSubmissionCard({
  item,
  compact = false,
}: {
  item: CommunitySubmission
  compact?: boolean
}) {
  const meta = COMMUNITY_KIND_META[item.kind]
  const chips = metaChips(item)
  const isGuide = item.kind === 'guide'
  const isLoadout = item.kind === 'loadout'
  const loadoutUrl = payloadString(item.payload, 'loadout_url')
  const hotbar = isLoadout ? previewFromLoadoutUrl(loadoutUrl) : []
  const summary = payloadString(item.payload, 'summary')
  const preview = isGuide && summary ? summary : item.body
  const socials = SOCIAL_KEYS.map(({ key, label }) => ({
    key,
    label,
    href: payloadString(item.payload, key),
  })).filter((s) => s.href)
  const leadIcon = hotbar[0]?.image || meta.icon

  return (
    <article
      className={`rounded-xl border bg-card p-4 sm:p-5 ${
        isGuide ? 'border-primary/35 sm:col-span-2' : 'border-border'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={leadIcon}
          alt=""
          className="h-11 w-11 shrink-0 object-contain drop-shadow-sm"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              {meta.label}
            </span>
            {item.payload?.seeded === true ? (
              <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Example kit
              </span>
            ) : null}
            <span className="text-[11px] text-muted-foreground">
              {formatSubmissionDate(item.created_at)}
            </span>
          </div>
          <h3 className="mt-1.5 font-display text-lg font-bold uppercase tracking-wide text-foreground">
            {item.title}
          </h3>
          <p className="mt-0.5 text-xs font-semibold text-muted-foreground">
            by {item.creator_name}
          </p>
          {hotbar.length > 0 ? (
            <div className="mt-3">
              <div className="grid grid-cols-5 gap-1.5">
                {hotbar.map((slot) => (
                  <div
                    key={slot.slot}
                    className="flex flex-col items-center rounded-lg border border-border bg-muted/40 p-1.5"
                    title={slot.name}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slot.image}
                      alt={slot.name}
                      className="h-9 w-9 object-contain drop-shadow-sm sm:h-10 sm:w-10"
                      loading="lazy"
                    />
                    <span className="mt-1 w-full truncate text-center text-[9px] font-semibold text-foreground">
                      {slot.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <p
            className={`mt-2 text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap ${
              compact || isGuide || isLoadout ? 'line-clamp-3' : ''
            }`}
          >
            {preview}
          </p>
          {chips.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[11px] font-semibold text-foreground"
                >
                  {chip}
                </li>
              ))}
            </ul>
          ) : null}
          {socials.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary hover:bg-primary/15"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <CardActions item={item} />
        </div>
      </div>
    </article>
  )
}

function metaChips(item: CommunitySubmission): string[] {
  const p = item.payload
  switch (item.kind) {
    case 'guide': {
      const cat = payloadString(p, 'category') as GuideCategory
      const label = GUIDE_CATEGORY_LABELS[cat] || cat
      return [label, p.promotes_socials ? 'Creator links' : ''].filter(Boolean)
    }
    case 'drop_spot':
      return [payloadString(p, 'poi'), payloadString(p, 'mode').replace('_', ' ')].filter(Boolean)
    case 'map_code':
    case 'xp_map':
      return [payloadString(p, 'code'), payloadString(p, 'island_name')].filter(Boolean)
    case 'keybinds':
      return [payloadString(p, 'layout').replace('_', ' ')].filter(Boolean)
    case 'fps_preset':
      return [payloadString(p, 'preset'), payloadString(p, 'refresh') ? `${payloadString(p, 'refresh')}Hz` : ''].filter(
        Boolean
      )
    case 'settings':
      return [
        payloadString(p, 'platform'),
        payloadString(p, 'sens') ? `Sens ${payloadString(p, 'sens')}` : '',
        payloadString(p, 'dpi') ? `DPI ${payloadString(p, 'dpi')}` : '',
      ].filter(Boolean)
    case 'tip':
      return [payloadString(p, 'topic')].filter(Boolean)
    case 'weapon_take':
      return [
        payloadString(p, 'weapon'),
        payloadString(p, 'tier') ? `${payloadString(p, 'tier')} tier` : '',
      ].filter(Boolean)
    case 'clip':
      return [payloadString(p, 'platform')].filter(Boolean)
    case 'combo':
      return [payloadString(p, 'difficulty')].filter(Boolean)
    default:
      return []
  }
}

function CardActions({ item }: { item: CommunitySubmission }) {
  if (item.kind === 'guide') {
    const youtube = payloadString(item.payload, 'youtube')
    return (
      <div className="mt-3 flex flex-wrap gap-3">
        <Link
          href={`/upload/post/${item.id}`}
          className="inline-flex text-sm font-bold text-primary hover:underline"
        >
          Read full guide →
        </Link>
        {youtube ? (
          <a
            href={youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-sm font-bold text-primary hover:underline"
          >
            YouTube →
          </a>
        ) : null}
      </div>
    )
  }
  if (item.kind === 'loadout') {
    const href = payloadString(item.payload, 'loadout_url')
    return (
      <div className="mt-3 flex flex-wrap gap-3">
        {href ? (
          <Link href={href} className="inline-flex text-sm font-bold text-primary hover:underline">
            Open in builder →
          </Link>
        ) : null}
        <Link
          href={`/upload/post/${item.id}`}
          className="inline-flex text-sm font-bold text-primary hover:underline"
        >
          View submission →
        </Link>
      </div>
    )
  }
  if (item.kind === 'clip') {
    const href = payloadString(item.payload, 'url')
    if (!href) return null
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex text-sm font-bold text-primary hover:underline"
      >
        Watch clip →
      </a>
    )
  }
  if (item.kind === 'map_code') {
    return (
      <Link href="/codes" className="mt-3 inline-flex text-sm font-bold text-primary hover:underline">
        Browse map codes →
      </Link>
    )
  }
  return (
    <Link
      href={`/upload/${item.kind}`}
      className="mt-3 inline-flex text-sm font-bold text-primary hover:underline"
    >
      Submit your own →
    </Link>
  )
}
