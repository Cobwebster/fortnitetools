import Link from '@/components/link'
import { cosmeticIconFallback, type PublicLockerCard } from '@/lib/lockers'
import { siteConfig } from '@/lib/site'

export function LockerDirectoryGrid({ lockers }: { lockers: PublicLockerCard[] }) {
  if (!lockers.length) {
    return (
      <p className="rounded-xl border border-dashed border-border px-5 py-10 text-center text-sm text-muted-foreground">
        No public lockers yet. Sign in, build yours at /locker, and it shows up here.
      </p>
    )
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {lockers.map((locker) => {
        const href = `/locker/${locker.slug}`
        const share = `${siteConfig.domain}${href}`
        return (
          <li key={locker.slug}>
            <Link
              href={href}
              className="block rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
            >
              <p className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                {locker.displayName}
              </p>
              <p className="mt-1 truncate text-xs text-primary">{share}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {locker.itemCount} item{locker.itemCount === 1 ? '' : 's'}
              </p>
              {locker.previewIds.length ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {locker.previewIds.map((id) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={id}
                      src={cosmeticIconFallback(id)}
                      alt=""
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-md border border-border bg-black/40 object-contain p-0.5"
                      loading="lazy"
                    />
                  ))}
                </div>
              ) : (
                <p className="mt-3 rounded-md border border-dashed border-border px-2 py-3 text-[11px] text-muted-foreground">
                  No cosmetics added yet
                </p>
              )}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
