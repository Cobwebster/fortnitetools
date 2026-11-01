import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GuidesIndex } from '@/components/GuidesIndex'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Guides',
  description:
    'Treasure Hunters Fortnite guides — Pirate Shop Access, Shock Rocket, Wanted Posters, Battle Pass vs shop, and Crossbones Isle loot. Older Override / Runners articles stay dated.',
  path: '/guides',
  keywords: [
    'fortnite guides',
    'fortnite treasure hunters',
    'pirate shop access',
    'shock rocket fortnite',
    'crossbones isle',
  ],
})

export default function GuidesPage() {
  return (
    <>
      <Navbar />
      <main>
        <GuidesIndex page={1} />
      </main>
      <Footer />
    </>
  )
}
