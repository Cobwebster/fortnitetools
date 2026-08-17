'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { newsTake, type NewsMotd, type NewsPayload, type StwMessage } from '@/lib/fortnite-news'

function formatNewsDate(iso: string | null) {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}

function MotdCard({ motd, featured }: { motd: NewsMotd; featured?: boolean }) {
  const take = newsTake(motd)
  const art = motd.image || motd.tileImage
  return (
    <article className={featured ? 'overflow-hidden rounded-2xl border border-border bg-card' : 'overflow-hidden rounded-xl border border-border bg-card'}>
      {art ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={art}
          alt={motd.title}
          className={featured ? 'aspect-video w-full object-cover' : 'aspect-[16/9] w-full object-cover'}
        />
      ) : null}
      <div className={featured ? 'space-y-3 p-5 sm:p-6' : 'space-y-2 p-4'}>
        <h2 className={featured ? 'font-display text-2xl font-bold uppercase tracking-wide text-foreground' : 'font-display text-lg font-bold uppercase tracking-wide text-foreground'}>
          {motd.title}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{motd.body}</p>
        <p className="text-sm leading-relaxed text-foreground/90">
          <span className="font-semibold text-foreground">FortniteTools: </span>
          {take.note}
        </p>
        {take.links.length > 0 ? (
          <p className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
            {take.links.map((link) => (
              <Link key={link.href} href={link.href} className="text-primary hover:underline">
                {link.label}
              </Link>
            ))}
          </p>
        ) : null}
      </div>
    </article>
  )
}

function StwCard({ message }: { message: StwMessage }) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card">
      {message.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={message.image} alt={message.title} className="aspect-[2/1] w-full object-cover" />
      ) : null}
      <div className="space-y-2 p-4">
        <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">{message.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{message.body}</p>
      </div>
    </article>
  )
}

export function FortniteNewsClient({ data }: { data: NewsPayload }) {
  const [tab, setTab] = useState<'br' | 'stw'>('br')
  const featured = data.motds[0]
  const rest = data.motds.slice(1)
  const brStamp = formatNewsDate(data.brDate)
  const stwStamp = formatNewsDate(data.stwDate)

  const tabs = useMemo(
    () =>
      [
        { id: 'br' as const, label: `Battle Royale (${data.motds.length})` },
        { id: 'stw' as const, label: `Save the World (${data.stwMessages.length})` },
      ] as const,
    [data.motds.length, data.stwMessages.length]
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              tab === item.id
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:text-foreground'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'br' ? (
        <div className="space-y-6">
          {brStamp ? (
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Lobby news updated {brStamp}</p>
          ) : null}
          {featured ? <MotdCard motd={featured} featured /> : (
            <p className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
              No Battle Royale lobby tiles right now.
            </p>
          )}
          {rest.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {rest.map((motd) => (
                <MotdCard key={motd.id} motd={motd} />
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="space-y-4">
          {stwStamp ? (
            <p className="text-xs uppercase tracking-wider text-muted-foreground">STW message updated {stwStamp}</p>
          ) : null}
          {data.stwMessages.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
              No Save the World message of the day in this payload.
            </p>
          ) : (
            data.stwMessages.map((message) => <StwCard key={message.title} message={message} />)
          )}
        </div>
      )}
    </div>
  )
}
