import type { Metadata } from 'next'
import Link from '@/components/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LockerGrid } from '@/components/LockerGrid'
import { createClient } from '@/lib/supabase/server'
import { getLockerBySlug } from '@/lib/lockers-db'
import { resolveLockerCosmetics } from '@/lib/lockers'
import { breadcrumbJsonLd, createMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { CURRENT_SEASON } from '@/lib/season'

export const revalidate = 60
export const dynamicParams = true

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const locker = await getLockerBySlug(slug)
  if (!locker || !locker.is_public) {
    return { robots: { index: false, follow: false } }
  }
  const count = locker.itemIds.length
  return createMetadata({
    title: `${locker.display_name}’s Fortnite Locker`,
    description: `${locker.display_name}’s shared Fortnite locker — ${count} cosmetic${count === 1 ? '' : 's'} (outfits, pickaxes, wraps, and more).`,
    path: `/locker/${locker.slug}`,
    keywords: [`${locker.display_name} fortnite locker`, 'fortnite locker', 'fortnite cosmetics'],
    index: count > 0,
  })
}

export default async function PublicLockerPage({ params }: Props) {
  const { slug } = await params
  const locker = await getLockerBySlug(slug)
  if (!locker) notFound()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isOwner = user?.id === locker.user_id

  if (!locker.is_public && !isOwner) notFound()

  const items = await resolveLockerCosmetics(locker.itemIds)
  const shareUrl = `${siteConfig.url}/locker/${locker.slug}`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Player lockers', path: '/lockers' },
              { name: locker.display_name, path: `/locker/${locker.slug}` },
            ])
          ),
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <Link href="/lockers" className="hover:text-primary">
                Player lockers
              </Link>
              <span>/</span>
              <span className="text-foreground">{locker.display_name}</span>
            </nav>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {CURRENT_SEASON.shortLabel} · {locker.is_public ? 'Public locker' : 'Unlisted locker'}
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-wide text-foreground sm:text-5xl">
              {locker.display_name}
              <span className="text-primary"> Locker</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {items.length} item{items.length === 1 ? '' : 's'}. Make your own locker to share.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {shareUrl}
              {isOwner ? (
                <>
                  {' · '}
                  <Link href="/locker" className="text-primary hover:underline">
                    Edit locker
                  </Link>
                </>
              ) : (
                <>
                  {' · '}
                  <Link href="/locker" className="text-primary hover:underline">
                    Build yours
                  </Link>
                </>
              )}
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <LockerGrid items={items} />
        </div>
      </main>
      <Footer />
    </>
  )
}
