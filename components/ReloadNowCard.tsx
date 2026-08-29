'use client'

import { useEffect, useState } from 'react'
import Link from '@/components/link'
import { formatRemaining, getRotationSnapshot, type RotationSnapshot } from '@/lib/map-rotation'

export function ReloadNowCard() {
  const [snap, setSnap] = useState<RotationSnapshot | null>(null)

  useEffect(() => {
    setSnap(getRotationSnapshot('reload'))
    const id = window.setInterval(() => setSnap(getRotationSnapshot('reload')), 250)
    return () => window.clearInterval(id)
  }, [])

  if (!snap) {
    return (
      <div className="rounded-xl border border-border bg-card px-4 py-6 text-sm text-muted-foreground">
        Loading the live Reload island…
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="relative min-h-[12rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={snap.current.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="relative z-10 flex h-full flex-col justify-end gap-2 p-5 sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Live Reload island</p>
          <p className="font-display text-3xl font-extrabold uppercase tracking-wide text-foreground">
            {snap.current.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatRemaining(snap.remainingMs)} left · next {snap.next.name}
          </p>
          <p className="text-sm">
            <Link href="/map-rotation" className="font-semibold text-primary hover:underline">
              Open the rotation timer
            </Link>
            <span className="text-muted-foreground"> — this card is the clock; the rest of the page is the mode.</span>
          </p>
        </div>
      </div>
    </div>
  )
}
