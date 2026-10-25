import Link from '@/components/link'
import { guidesPageHref } from '@/lib/guides-pagination'
import { siteConfig } from '@/lib/site'

export function GuidesPagination({
  page,
  totalPages,
}: {
  page: number
  totalPages: number
}) {
  if (totalPages <= 1) return null

  const prevHref = page > 1 ? guidesPageHref(page - 1) : null
  const nextHref = page < totalPages ? guidesPageHref(page + 1) : null
  const numbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <>
      {prevHref ? <link rel="prev" href={`${siteConfig.url}${prevHref}`} /> : null}
      {nextHref ? <link rel="next" href={`${siteConfig.url}${nextHref}`} /> : null}
      <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Guides pages">
        {prevHref ? (
          <Link
            href={prevHref}
            rel="prev"
            className="rounded-lg border border-border px-3 py-2 text-sm font-semibold text-muted-foreground hover:border-primary/60 hover:text-primary"
          >
            Previous
          </Link>
        ) : (
          <span className="rounded-lg border border-transparent px-3 py-2 text-sm text-muted-foreground/40">
            Previous
          </span>
        )}
        <ol className="flex flex-wrap items-center gap-1.5" role="list">
          {numbers.map((n) => {
            const href = guidesPageHref(n)
            const current = n === page
            return (
              <li key={n}>
                <Link
                  href={href}
                  aria-label={n === 1 ? 'Guides page 1' : `Guides page ${n}`}
                  aria-current={current ? 'page' : undefined}
                  className={`inline-flex min-w-9 items-center justify-center rounded-lg border px-3 py-2 text-sm font-semibold ${
                    current
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/60 hover:text-primary'
                  }`}
                >
                  {n}
                </Link>
              </li>
            )
          })}
        </ol>
        {nextHref ? (
          <Link
            href={nextHref}
            rel="next"
            className="rounded-lg border border-border px-3 py-2 text-sm font-semibold text-muted-foreground hover:border-primary/60 hover:text-primary"
          >
            Next
          </Link>
        ) : (
          <span className="rounded-lg border border-transparent px-3 py-2 text-sm text-muted-foreground/40">
            Next
          </span>
        )}
      </nav>
    </>
  )
}
