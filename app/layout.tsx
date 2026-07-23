import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import './globals.css'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-barlow-condensed',
})

export const metadata: Metadata = {
  title: {
    default: 'FortniteTools.com – Guides, Tips & Tools for Fortnite Players',
    template: '%s | FortniteTools.com',
  },
  description:
    'Your #1 resource for Fortnite guides, weapon tier lists, building tips, map locations, and season updates. Level up your game with FortniteTools.com.',
  keywords: [
    'Fortnite guides',
    'Fortnite tips',
    'Fortnite tools',
    'Fortnite weapons',
    'Fortnite building',
    'Fortnite map',
    'Fortnite season',
    'battle royale guides',
    'Fortnite tier list',
    'Fortnite strategy',
  ],
  authors: [{ name: 'FortniteTools.com' }],
  creator: 'FortniteTools.com',
  metadataBase: new URL('https://fortnitetools.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fortnitetools.com',
    siteName: 'FortniteTools.com',
    title: 'FortniteTools.com – Guides, Tips & Tools for Fortnite Players',
    description:
      'Your #1 resource for Fortnite guides, weapon tier lists, building tips, map locations, and season updates.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FortniteTools.com – Fortnite Guides & Tips',
    description:
      'Your #1 resource for Fortnite guides, weapon tier lists, building tips, and more.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0f1e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${barlow.variable} ${barlowCondensed.variable}`}>
      <body className={`antialiased font-sans`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
