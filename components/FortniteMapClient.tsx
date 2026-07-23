'use client'

import dynamic from 'next/dynamic'

const FortniteLeafletMap = dynamic(
  () =>
    import('@/components/FortniteLeafletMap').then((m) => m.FortniteLeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[min(70vh,640px)] items-center justify-center rounded-xl border border-border bg-card text-sm text-muted-foreground">
        Loading interactive map…
      </div>
    ),
  },
)

export function FortniteMapClient() {
  return <FortniteLeafletMap />
}
