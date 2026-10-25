import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GuidesIndex } from '@/components/GuidesIndex'
import { createMetadata } from '@/lib/seo'
import {
  guidesPageHref,
  guidesTotalPages,
  parseGuidesPageParam,
} from '@/lib/guides-pagination'

export const dynamicParams = true

type Props = { params: Promise<{ page: string }> }

export function generateStaticParams() {
  const total = guidesTotalPages()
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({
    page: String(i + 2),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page: raw } = await params
  const page = parseGuidesPageParam(raw)
  const total = guidesTotalPages()
  if (!page || page < 2 || page > total) {
    return { robots: { index: false, follow: true } }
  }
  return createMetadata({
    title: `Fortnite Guides – Page ${page}`,
    description: `Page ${page} of ${total} Fortnite Override guides on FortniteTools — Battle Pass, map drops, weapons, and how-tos.`,
    path: guidesPageHref(page),
    keywords: [
      'fortnite guides',
      'fortnite override',
      `fortnite guides page ${page}`,
      'chapter 7 season 4',
    ],
  })
}

export default async function GuidesPagedPage({ params }: Props) {
  const { page: raw } = await params
  const page = parseGuidesPageParam(raw)
  if (!page) notFound()
  if (page === 1) permanentRedirect('/guides')
  if (page > guidesTotalPages()) notFound()

  return (
    <>
      <Navbar />
      <main>
        <GuidesIndex page={page} />
      </main>
      <Footer />
    </>
  )
}
