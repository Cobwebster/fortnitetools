import Link from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { UploadSubmissionCard } from '@/components/upload-submission-card'
import { UploadCloud } from 'lucide-react'
import {
  COMMUNITY_KINDS,
  COMMUNITY_KIND_META,
} from '@/lib/community-submissions'
import {
  fetchCommunityCounts,
  fetchCommunityFeed,
} from '@/lib/community-submissions-db'

export const dynamic = 'force-dynamic'

export default async function UploadHubPage() {
  const [{ items }, counts] = await Promise.all([
    fetchCommunityFeed({ limit: 48 }),
    fetchCommunityCounts(),
  ])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border bg-card py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Upload</span>
            </nav>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                  Community
                </p>
                <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
                  Fortnite <span className="text-primary">Uploads</span>
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  Player guides first — plus loadouts, drops, codes, settings, tips, and clips. Write
                  something useful, promote your YouTube or socials on the same post, and sign in free
                  to publish.
                </p>
              </div>
              <Link
                href="/upload/guide"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90"
              >
                <UploadCloud className="h-4 w-4" aria-hidden="true" />
                Submit a guide
              </Link>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-12">
          <section>
            <Link
              href="/upload/guide"
              className="group relative block overflow-hidden rounded-2xl border border-primary/40 bg-linear-to-br from-primary/20 via-card to-card p-6 sm:p-8 transition-colors hover:border-primary/70"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
              <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={COMMUNITY_KIND_META.guide.icon}
                    alt=""
                    className="h-16 w-16 object-contain drop-shadow-md transition-transform group-hover:scale-105 sm:h-20 sm:w-20"
                  />
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                      Featured · Creator promo welcome
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
                      Player-submitted guides
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      We accept full community guides — how-tos, drop routes, Ranked notes, weapon
                      write-ups, settings explainers. Link your YouTube video, Twitch, TikTok, Discord,
                      or socials on the form so readers can follow you while they learn.
                    </p>
                    <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-primary">
                      {(counts.guide ?? 0)} live guides · Open the big form →
                    </p>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">
                  <UploadCloud className="h-4 w-4" aria-hidden="true" />
                  Write a guide
                </span>
              </div>
            </Link>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
              What you can submit
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Guides lead the board. Everything else is a quicker post that still lands on the public feed.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {COMMUNITY_KINDS.filter((kind) => kind !== 'guide').map((kind) => {
                const meta = COMMUNITY_KIND_META[kind]
                const count = counts[kind] ?? 0
                return (
                  <Link
                    key={kind}
                    href={`/upload/${kind}`}
                    className="group rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={meta.icon}
                      alt=""
                      className="h-12 w-12 object-contain drop-shadow-sm transition-transform group-hover:scale-105"
                    />
                    <h3 className="mt-3 font-display text-lg font-bold uppercase text-foreground">
                      {meta.label}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{meta.blurb}</p>
                    <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-primary">
                      {count} live · Submit →
                    </p>
                  </Link>
                )
              })}
            </div>
          </section>

          <section>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                  Latest uploads
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Example kits plus verified posts we publish from the repo — not live DB reads.
                </p>
              </div>
            </div>

            {items.length === 0 ? (
              <div className="rounded-xl border border-border bg-card px-4 py-10 text-center">
                <p className="font-display text-xl font-bold uppercase text-foreground">
                  No uploads yet
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Be first — a player guide with your YouTube or socials is the best way to start.
                </p>
                <Link
                  href="/upload/guide"
                  className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:opacity-90"
                >
                  Submit a guide
                </Link>
              </div>
            ) : null}

            {items.length > 0 ? (
              <div className="grid gap-3 lg:grid-cols-2">
                {items.map((item) => (
                  <UploadSubmissionCard key={item.id} item={item} />
                ))}
              </div>
            ) : null}
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
