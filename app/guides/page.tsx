import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GuidesIndex } from '@/components/GuidesIndex'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Fortnite Guides',
  description:
    'Chapter 7 Season 4 (Override) Fortnite guides — Admin Panel codes, Green Hill Zone, Battle Pass XP, Match Overrides, and Ranked Null. Older Runners articles stay dated until rewritten.',
  path: '/guides',
  keywords: [
    'fortnite guides',
    'fortnite override',
    'admin panel codes',
    'green hill zone',
    'chapter 7 season 4',
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
