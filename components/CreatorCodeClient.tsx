'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { FortniteIcon } from '@/components/fortnite-icon'
import { CREATOR_CODE_EXAMPLES, type CreatorCodeResult } from '@/lib/creator-code'

export function CreatorCodeClient() {
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<CreatorCodeResult | null>(null)
  const [pending, startTransition] = useTransition()

  function lookup(raw?: string) {
    const code = (raw ?? name).trim()
    if (!code) return
    if (raw) setName(raw)
    setError(null)
    setResult(null)
    startTransition(async () => {
      try {
        const res = await fetch(`/api/fortnite/creator-code?name=${encodeURIComponent(code)}`)
        const data = await res.json()
        if (res.status === 404 || data.found === false) {
          setError(
            `No Support-A-Creator slug matched “${code}”. Try the overlay/bio string, not a clan tag or Epic display name.`
          )
          return
        }
        if (!res.ok) throw new Error(data.error || 'Lookup failed')
        setResult(data as CreatorCodeResult)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Lookup failed')
      }
    })
  }

  const active = result?.status.toUpperCase() === 'ACTIVE'

  return (
    <div className="space-y-5 rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <FortniteIcon src="/images/icons/vbucks.png" alt="V-Bucks" size="md" />
        <div>
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
            Look up a slug
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            We hit Fortnite-API’s creator-code endpoint — same source as the in-game SAC list, not a scrape of
            Twitter bios. A hit here still has to be typed in the Item Shop before checkout.
          </p>
        </div>
      </div>

      <form
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault()
          lookup()
        }}
      >
        <label className="block flex-1">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Support-A-Creator slug
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Paste the overlay code, e.g. ninja"
            className="w-full rounded-lg border border-border bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
            autoComplete="off"
            spellCheck={false}
          />
        </label>
        <button
          type="submit"
          disabled={pending || !name.trim()}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {pending ? 'Checking…' : 'Look up'}
        </button>
      </form>

      <p className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span>Try a known slug:</span>
        {CREATOR_CODE_EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => lookup(example)}
            className="rounded-full border border-border bg-background px-2.5 py-1 font-semibold uppercase tracking-wider text-foreground hover:border-primary/60"
          >
            {example}
          </button>
        ))}
      </p>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      {result ? (
        <div className="space-y-3 rounded-xl border border-border bg-background px-4 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">{result.code}</p>
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                active
                  ? 'border-green-500/40 bg-green-500/10 text-green-400'
                  : 'border-amber-500/40 bg-amber-500/10 text-amber-400'
              }`}
            >
              {result.status}
            </span>
            {result.verified ? (
              <span className="rounded-full border border-sky-500/40 bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-300">
                API verified
              </span>
            ) : null}
          </div>
          {result.accountName ? (
            <p className="text-sm text-muted-foreground">
              Maps to Epic display name <strong className="text-foreground">{result.accountName}</strong>
              {result.accountId ? (
                <>
                  {' '}
                  ·{' '}
                  <Link href="/tools/player-stats" className="text-primary hover:underline">
                    stats tracker
                  </Link>
                </>
              ) : null}
            </p>
          ) : null}
          <p className="text-sm leading-relaxed text-muted-foreground">
            {active
              ? 'Enter it in-game under Item Shop → Enter Code, then buy. If the shop field rejects it, the live SAC list moved — this checker can lag a few minutes.'
              : 'This slug is not ACTIVE. Do not assume a stream overlay is current; creators change tags when they hop orgs.'}
          </p>
        </div>
      ) : null}
    </div>
  )
}
