import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Fortnite Settings – FPS & Graphics Guide | FortniteTools.com',
  description: 'The best Fortnite graphics, display, and audio settings for maximum FPS. Competitive, balanced, and quality presets explained with pro tips for every setting.',
  keywords: ['best fortnite settings', 'fortnite fps settings', 'fortnite graphics settings', 'how to get more fps fortnite', 'fortnite performance mode'],
  openGraph: {
    title: 'Best Fortnite Settings – FPS & Graphics Guide',
    description: 'Every Fortnite setting explained with competitive, balanced, and quality presets. Find the right settings for your PC.',
    url: 'https://fortnitetools.com/tools/fps-settings',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
