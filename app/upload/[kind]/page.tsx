import Link from '@/components/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { UploadForm } from '@/components/upload-form'
import { UploadSubmissionCard } from '@/components/upload-submission-card'
import {
  COMMUNITY_KIND_META,
  isCommunityKind,
} from '@/lib/community-submissions'
import { fetchCommunityFeed } from '@/lib/community-submissions-db'
import { createClient } from '@/lib/supabase/server'
import { createMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ kind: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kind: raw } = await params
  if (!isCommunityKind(raw)) return {}
  const meta = COMMUNITY_KIND_META[raw]
  return createMetadata({
    title: `Submit ${meta.label} – Community Uploads`,
    description: `${meta.blurb} Browse other ${meta.shortLabel.toLowerCase()} on FortniteTools.`,
    path: `/upload/${raw}`,
  })
}

export default async function UploadKindPage({ params }: Props) {
  const { kind: raw } = await params
  if (!isCommunityKind(raw)) notFound()

  const meta = COMMUNITY_KIND_META[raw]
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const displayName =
    (user?.user_metadata?.display_name as string | undefined)?.trim() || ''

  const { items } = await fetchCommunityFeed({ kind: raw, limit: 24 })

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border bg-card py-10">
          <div
            className={`mx-auto px-4 sm:px-6 ${raw === 'guide' ? 'max-w-4xl' : 'max-w-3xl'}`}
          >
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/upload" className="hover:text-primary transition-colors">
                Upload
              </Link>
              <span>/</span>
              <span className="text-foreground">{meta.label}</span>
            </nav>
            <div className="flex items-start gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={meta.icon} alt="" className="h-14 w-14 object-contain drop-shadow-md" />
              <div>
                <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground">
                  Submit {meta.label}
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{meta.blurb}</p>
                {raw === 'guide' ? (
                  <p className="mt-2 text-sm font-semibold text-primary">
                    YouTube videos and social links are welcome — we show them on your public guide card.
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <div
          className={`mx-auto px-4 py-10 sm:px-6 space-y-10 ${
            raw === 'guide' ? 'max-w-4xl' : 'max-w-3xl'
          }`}
        >
          <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <UploadForm kind={raw} defaultCreatorName={displayName} signedIn={Boolean(user)} />
          </section>

          <section>
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground mb-4">
              Recent {meta.shortLabel.toLowerCase()}
            </h2>
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">None yet — your post can be first.</p>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <UploadSubmissionCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
