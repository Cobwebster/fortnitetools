import Link from '@/components/link'
import { UploadCloud } from 'lucide-react'

export function CommunitySubmitCta({
  href,
  title,
  body,
}: {
  href: string
  title: string
  body: string
}) {
  return (
    <section className="rounded-xl border border-primary/30 bg-linear-to-r from-primary/10 via-card to-card p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/15 p-2.5 text-primary">
            <UploadCloud className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
              Community uploads
            </p>
            <h2 className="mt-1 font-display text-xl font-bold text-foreground">{title}</h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">{body}</p>
          </div>
        </div>
        <Link
          href={href}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90"
        >
          Submit
          <UploadCloud className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
