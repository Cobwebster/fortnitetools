import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CommunitySubmitCta } from '@/components/community-submit-cta'
import { FpsSettingsView } from '@/components/fps-settings-view'
import { createMetadata } from '@/lib/seo'
import { absoluteLocaleUrl, hreflangAlternates } from '@/i18n/pathnames'

const base = createMetadata({
  title: 'Best Fortnite Settings – FPS & Graphics Guide (Chapter 7 Season 4)',
  description:
    'Every Fortnite graphics, display, and audio setting explained, with competitive, balanced, and quality presets to boost FPS and reduce input lag.',
  path: '/tools/fps-settings',
  keywords: [
    'best fortnite settings',
    'fortnite fps settings',
    'fortnite graphics settings',
    'fortnite competitive settings',
    'fortnite performance mode',
  ],
})

export const metadata: Metadata = {
  ...base,
  alternates: {
    canonical: absoluteLocaleUrl('en', '/tools/fps-settings'),
    languages: hreflangAlternates('/tools/fps-settings'),
  },
}

export default function FpsSettingsPage() {
  return (
    <>
      <Navbar />
      <FpsSettingsView />
      <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <CommunitySubmitCta
          href="/upload/fps_preset"
          title="Share your FPS / graphics preset"
          body="Competitive, balanced, or quality notes for your monitor and GPU — posted on the public /upload feed."
        />
      </div>
      <Footer />
    </>
  )
}
