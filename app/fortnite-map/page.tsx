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
        name: 'What is the current Fortnite map in Treasure Hunters?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Treasure Hunters (v43.00, 1 Nov 2026) uses Crossbones Isle, an 80-player Battle Royale island. Epic named Arlong Park, Windmill Village, and The $.$. Rocky (A$AP Rocky’s battleship). This tool’s pins follow Fortnite-API. As of 1 Nov 2026 that dump still lists the previous Override island (Green Hill Zone, Reality’s Reign, Stone Sanctum, Lifty Lodge, and Fortnitemares landmarks). We will pin Crossbones Isle names when the API publishes coordinates — we will not invent them.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is the Pirate Shop on the Fortnite map?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It is not a map pin. Pirate Shop Access is a rare Battle Royale chest prize (not a POI). Open chests, watch for the unlock MOTD, then claim Item Shop rows during the 14-day windows. Full steps: /guides/how-to/how-to-get-pirate-shop-access-fortnite.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where should I land in Fortnite for the best loot?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'On Crossbones Isle, headline drops are Arlong Park, Windmill Village, and The $.$. Rocky once those names appear in-game. Until Fortnite-API ships those coordinates, the pins on this page still match the previous island dump. Use in-game labels over this overlay for Treasure Hunters landings.',
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
          text: 'The minimap image and coordinates load from live Fortnite-API data, so named locations refresh when that dump updates. Editorial loot tips are reviewed around major patches. Treasure Hunters launched 1 Nov 2026; Crossbones Isle pins land here when Fortnite-API lists them.',
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
      'Interactive Fortnite Treasure Hunters map. Pins follow Fortnite-API’s live dump. Pirate Shop Access is a chest prize, not a POI.',
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
