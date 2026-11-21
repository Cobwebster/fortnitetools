import type { PublicLockerCard } from '@/lib/lockers'

/** Cards per page — crawlable path pages, not query-string infinite scroll. */
export const LOCKERS_PAGE_SIZE = 30

export function lockersPageHref(page: number) {
  return page <= 1 ? '/lockers' : `/lockers/pages/${page}`
}

export function lockersTotalPages(total: number) {
  return Math.max(1, Math.ceil(total / LOCKERS_PAGE_SIZE))
}

export function paginateLockers(all: PublicLockerCard[], page: number) {
  const total = all.length
  const totalPages = lockersTotalPages(total)
  const start = (page - 1) * LOCKERS_PAGE_SIZE
  return {
    items: all.slice(start, start + LOCKERS_PAGE_SIZE),
    page,
    total,
    totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
  }
}

export function parseLockersPageParam(raw: string) {
  if (!/^[1-9]\d{0,3}$/.test(raw)) return null
  return Number(raw)
}
