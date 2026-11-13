import Link from '@/components/link'
import Image from 'next/image'
import { Clock } from 'lucide-react'
import {
  type LeakPost,
  getLeakCategoryLabel,
  formatLeakDate,
  LEAK_STATUS_LABEL,
} from '@/lib/leaks'

const STATUS_CLASS: Record<LeakPost['status'], string> = {
  active: 'bg-amber-500/15 text-amber-200 border-amber-500/40',
  watching: 'bg-sky-500/15 text-sky-200 border-sky-500/40',
  shipped: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/40',
  dead: 'bg-muted text-muted-foreground border-border',
}

export function LeakCard({ leak, featured = false }: { leak: LeakPost; featured?: boolean }) {
  const href = `/leaks/${leak.slug}`

  return (
    <article className="group relative h-full overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/50">
      <Link href={href} className="flex h-full flex-col">
        {leak.image ? (
          <div className={`relative w-full shrink-0 overflow-hidden ${featured ? 'h-48 sm:h-56' : 'h-40'}`}>
            <Image
              src={leak.image}
              alt={leak.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={
                featured
                  ? '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw'
                  : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              }
            />
            <div className="absolute inset-0 bg-linear-to-t from-card via-card/35 to-transparent" />
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              <span className="rounded bg-primary px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
                {getLeakCategoryLabel(leak.category)}
              </span>
              <span
                className={`rounded border px-2 py-0.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm ${STATUS_CLASS[leak.status]}`}
              >
                {LEAK_STATUS_LABEL[leak.status]}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 px-5 pt-5">
            <span className="rounded bg-primary px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
              {getLeakCategoryLabel(leak.category)}
            </span>
            <span
              className={`rounded border px-2 py-0.5 text-xs font-semibold uppercase tracking-wider ${STATUS_CLASS[leak.status]}`}
            >
              {LEAK_STATUS_LABEL[leak.status]}
            </span>
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <h2
            className={`font-display font-bold uppercase leading-tight text-foreground transition-colors group-hover:text-primary text-balance ${
              featured ? 'text-xl sm:text-2xl' : 'text-lg'
            }`}
          >
            {leak.title}
          </h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {leak.excerpt}
          </p>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
            <time dateTime={leak.date}>{formatLeakDate(leak.date)}</time>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {leak.readTime} min
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
