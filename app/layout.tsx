import type { Metadata, Viewport } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import { CookieConsent } from '@/components/cookie-consent'
import { IntlProvider } from '@/components/intl-provider'
import { websiteJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { defaultLocale } from '@/i18n/config'
import { getMessages } from '@/i18n/get-messages'
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

const ogImage = `${siteConfig.url}${siteConfig.ogImage}`

export const metadata: Metadata = {
  title: {
    default: 'FortniteTools – Free Fortnite Guides & Tools',
    template: '%s | FortniteTools',
  },
  description: siteConfig.description,
  keywords: [
    'Fortnite tools',
    'Fortnite guides',
    'Fortnite XP calculator',
    'Fortnite sensitivity converter',
    'Fortnite keybinds',
    'Chapter 7 Season 3',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: siteConfig.url },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'FortniteTools – Free Fortnite Guides & Tools',
    description: siteConfig.description,
    images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FortniteTools – Free Fortnite Guides & Tools',
    description: siteConfig.description,
    images: [ogImage],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = websiteJsonLd()
  const messages = await getMessages(defaultLocale)

  return (
    <html lang="en" className={`bg-background ${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <IntlProvider locale={defaultLocale} messages={messages}>
          {children}
          <CookieConsent />
        </IntlProvider>
      </body>
    </html>
  )
}
