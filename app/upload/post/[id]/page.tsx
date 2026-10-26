import Link from '@/components/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import {
  COMMUNITY_KIND_META,
  GUIDE_CATEGORY_LABELS,
  formatSubmissionDate,
  payloadString,
  type GuideCategory,
} from '@/lib/community-submissions'
import { fetchCommunityById } from '@/lib/community-submissions-db'
import { articleJsonLd, breadcrumbJsonLd, createMetadata, faqJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const item = await fetchCommunityById(id)
  if (!item) return {}
  const summary = payloadString(item.payload, 'summary') || item.body.slice(0, 155)
  const tags = Array.isArray(item.payload.tags)
    ? (item.payload.tags as string[])
    : undefined
  return createMetadata({
    title: item.title,
    description: summary,
    path: `/upload/post/${item.id}`,
    type: item.kind === 'guide' ? 'article' : 'website',
    publishedTime: item.created_at,
    tags,
    keywords: tags,
  })
}

export default async function UploadPostPage({ params }: Props) {
  const { id } = await params
  const item = await fetchCommunityById(id)
  if (!item) notFound()

  const meta = COMMUNITY_KIND_META[item.kind]
  const summary = payloadString(item.payload, 'summary')
  const outline = payloadString(item.payload, 'outline')
  const relatedTool = payloadString(item.payload, 'related_tool')
  const category = payloadString(item.payload, 'category') as GuideCategory
  const difficulty = payloadString(item.payload, 'difficulty')
  const audience = payloadString(item.payload, 'audience')
  const readMinutes = Number(item.payload.read_minutes || 0) || null
  const tags = Array.isArray(item.payload.tags) ? (item.payload.tags as string[]) : []
  const modes = Array.isArray(item.payload.modes) ? (item.payload.modes as string[]) : []
  const faqs = Array.isArray(item.payload.faqs)
    ? (item.payload.faqs as { q: string; a: string }[])
    : []
  const socials = [
    ['YouTube', payloadString(item.payload, 'youtube')],
    ['Twitch', payloadString(item.payload, 'twitch')],
    ['TikTok', payloadString(item.payload, 'tiktok')],
    ['X / Twitter', payloadString(item.payload, 'twitter')],
    ['Discord', payloadString(item.payload, 'discord')],
    ['Website', payloadString(item.payload, 'website')],
  ].filter(([, href]) => href) as [string, string][]

  const loadoutUrl = payloadString(item.payload, 'loadout_url')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Upload', path: '/upload' },
              { name: item.title, path: `/upload/post/${item.id}` },
            ])
          ),
        }}
      />
      {item.kind === 'guide' ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              articleJsonLd({
                title: item.title,
                description: summary || item.body.slice(0, 160),
                path: `/upload/post/${item.id}`,
                datePublished: item.created_at,
              })
            ),
          }}
        />
      ) : null}
      {faqs.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              faqJsonLd(faqs.map((f) => ({ question: f.q, answer: f.a })))
            ),
          }}
        />
      ) : null}

      <Navbar />
      <main className="min-h-screen bg-background">
        <article className="py-10">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <Link href="/upload" className="hover:text-primary">
                Upload
              </Link>
              <span>/</span>
              <Link href={`/upload/${item.kind}`} className="hover:text-primary">
                {meta.shortLabel}
              </Link>
              <span>/</span>
              <span className="text-foreground">Post</span>
            </nav>

            <div className="flex items-start gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={meta.icon} alt="" className="h-14 w-14 object-contain" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                  {meta.label}
                  {category ? ` · ${GUIDE_CATEGORY_LABELS[category] || category}` : ''}
                </p>
                <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
                  {item.title}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  by <span className="font-semibold text-foreground">{item.creator_name}</span>
                  {' · '}
                  {formatSubmissionDate(item.created_at)}
                  {readMinutes ? ` · ${readMinutes} min read` : ''}
                </p>
              </div>
            </div>

            {summary ? (
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{summary}</p>
            ) : null}

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {difficulty ? <Chip>{difficulty}</Chip> : null}
              {audience ? <Chip>{audience}</Chip> : null}
              {modes.map((m) => (
                <Chip key={m}>{m.replace('_', ' ')}</Chip>
              ))}
              {tags.map((t) => (
                <Chip key={t}>#{t}</Chip>
              ))}
            </ul>
          </div>
        </article>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 space-y-8">
          {outline ? (
            <section className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-display text-xl font-bold uppercase text-foreground">What you’ll learn</h2>
              <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted-foreground">
                {outline}
              </pre>
            </section>
          ) : null}

          <section>
            <h2 className="font-display text-xl font-bold uppercase text-foreground mb-3">
              {item.kind === 'guide' ? 'Guide' : 'Details'}
            </h2>
            <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
              {item.body}
            </div>
          </section>

          {faqs.length > 0 ? (
            <section>
              <h2 className="font-display text-xl font-bold uppercase text-foreground mb-4">FAQ</h2>
              <div className="space-y-4">
                {faqs.map((f) => (
                  <div key={f.q}>
                    <h3 className="text-sm font-bold text-foreground">{f.q}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {socials.length > 0 ? (
            <section className="rounded-xl border border-primary/30 bg-primary/5 p-5">
              <h2 className="font-display text-lg font-bold uppercase text-foreground">
                Follow {item.creator_name}
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {socials.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          <div className="flex flex-wrap gap-4 text-sm font-bold">
            {loadoutUrl ? (
              <Link href={loadoutUrl} className="text-primary hover:underline">
                Open in loadout builder →
              </Link>
            ) : null}
            {relatedTool ? (
              <Link href={relatedTool} className="text-primary hover:underline">
                Related tool →
              </Link>
            ) : null}
            <Link href={`/upload/${item.kind}`} className="text-primary hover:underline">
              Submit your own →
            </Link>
            <Link href="/upload" className="text-muted-foreground hover:text-primary">
              All uploads
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[11px] font-semibold capitalize text-foreground">
      {children}
    </li>
  )
}
