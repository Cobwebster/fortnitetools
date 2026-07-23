import type { Metadata } from 'next'

/** Legacy URL — always redirect via page.tsx; keep out of the index. */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
}

export default function MapLegacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
