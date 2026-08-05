import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FortniteMapView } from '@/components/fortnite-map-view'
import { breadcrumbJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export default function FortniteMapPage() {
  const crumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Fortnite Map', path: '/fortnite-map' },
  ])

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the current Fortnite map in Chapter 7 Season 3?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Chapter 7 Season 3 (Runners) uses the Shattered Coast island, added after the Shattered live event. Named locations include Lifty Lodge, Battlewoods, Wonkeeland, Latte Landing, Frosted Flats, Sinister Strip, Golden Grove, Shaken Sanctuary, Cluster Coast, Sunken Shores, Heatwave Harbor, Calamari Canyon, and Chopped Shop.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where are Fortnite Extraction Sites in Chapter 7 Season 3?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Extraction Sites sit near major Shattered Coast POIs (Lifty Lodge, Sinister Strip, Sunken Shores, Wonkeeland, and more). Toggle the Extraction Sites layer on this map. Sites unlock after the first storm circle closes; activating one broadcasts your location for ~30 seconds while the crate arrives.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where should I land in Fortnite for the best loot?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'High-loot contested drops like Heatwave Harbor, Lifty Lodge, Battlewoods, and Sinister Strip reward early fights. For cleaner loot into zone, use balanced spots such as Wonkeeland or Latte Landing. Edge POIs like Cluster Coast and Sunken Shores are better for placement-focused games.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I use this interactive Fortnite map?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the left sidebar: pick Battle Royale, search spawns/POIs, toggle spawn layers (vaults, Sprite chests, chests, vehicles, reboot vans, and more), Named Locations / Landmarks, then filter drops by hot / balanced / edge. Click markers for tips. Spawn pins are POI-anchored planning markers. OG, Reload, and Blitz maps are still coming soon.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does this Fortnite map update every season?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The minimap image and coordinates load from live Fortnite-API data, so named locations refresh when Epic updates the island. Editorial loot tips and Extraction Site overlays are reviewed around major Chapter 7 Season 3 patches.',
        },
      },
    ],
  }

  const webAppLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Fortnite Interactive Map',
    url: `${siteConfig.url}/fortnite-map`,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
    description:
      'Interactive Fortnite Chapter 7 Season 3 map with live Shattered Coast minimap, POI markers, Extraction Sites for Sprites, loot ratings, and drop filters.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      <Navbar />
      <FortniteMapView />
      <Footer />
    </>
  )
}
