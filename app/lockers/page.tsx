import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LockersIndex } from '@/components/LockersIndex'
import { createMetadata } from '@/lib/seo'

export const dynamic = 'force-static'
export const revalidate = false

export const metadata: Metadata = createMetadata({
  title: 'Player Fortnite Lockers',
  description:
    'Browse public Fortnite lockers players built on FortniteTools. Open a share link, or sign in and make yours.',
  path: '/lockers',
  keywords: [
    'fortnite lockers',
    'player fortnite lockers',
    'shared fortnite locker',
    'fortnite cosmetics locker',
  ],
})

export default function PlayerLockersPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <LockersIndex page={1} />
      </main>
      <Footer />
    </>
  )
}
