import { getPostsSorted, type Post } from '@/lib/posts'

/** Cards per page — enough unique content that page 2+ is not a thin stub. */
export const GUIDES_PAGE_SIZE = 24

export function guidesPageHref(page: number) {
  return page <= 1 ? '/guides' : `/guides/pages/${page}`
}

export function guidesTotalPages(total = getPostsSorted().length) {
  return Math.max(1, Math.ceil(total / GUIDES_PAGE_SIZE))
}

export function paginateGuides(all: Post[], page: number) {
  const total = all.length
  const totalPages = guidesTotalPages(total)
  const start = (page - 1) * GUIDES_PAGE_SIZE
  return {
    items: all.slice(start, start + GUIDES_PAGE_SIZE),
    page,
    total,
    totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
  }
}

export function parseGuidesPageParam(raw: string) {
  if (!/^[1-9]\d{0,3}$/.test(raw)) return null
  return Number(raw)
}
