import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LockersIndex } from '@/components/LockersIndex'
import { listPublicLockers } from '@/lib/lockers-db'
import {
  lockersPageHref,
  lockersTotalPages,
  parseLockersPageParam,
} from '@/lib/lockers-pagination'
import { createMetadata } from '@/lib/seo'

export const dynamic = 'force-static'
export const revalidate = false
export const dynamicParams = true

type Props = { params: Promise<{ page: string }> }

export async function generateStaticParams() {
  const lockers = await listPublicLockers().catch(() => [])
  const total = lockersTotalPages(lockers.length)
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({
    page: String(i + 2),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page: raw } = await params
  const page = parseLockersPageParam(raw)
  const lockers = await listPublicLockers().catch(() => [])
  const total = lockersTotalPages(lockers.length)
  if (!page || page < 2 || page > total) {
    return { robots: { index: false, follow: true } }
  }
  return createMetadata({
    title: `Player Fortnite Lockers – Page ${page}`,
    description: `Page ${page} of ${total} public Fortnite player lockers on FortniteTools — shared cosmetics pages with real share links.`,
    path: lockersPageHref(page),
    keywords: [
      'fortnite lockers',
      'player fortnite lockers',
      `fortnite lockers page ${page}`,
      'shared fortnite locker',
    ],
  })
}

export default async function LockersPagedPage({ params }: Props) {
  const { page: raw } = await params
  const page = parseLockersPageParam(raw)
  if (!page) notFound()
  if (page === 1) permanentRedirect('/lockers')

  const lockers = await listPublicLockers().catch(() => [])
  const total = lockersTotalPages(lockers.length)
  if (page > total) permanentRedirect('/lockers')

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <LockersIndex page={page} />
      </main>
      <Footer />
    </>
  )
}
