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
          text: 'Treasure Hunters (v43.00) uses Crossbones Isle, an 80-player Battle Royale island. Live Fortnite-API names include Arlong Park, Fortune’s Fort, Rubber Resort, Loguetown, Lantern Landing, The $.$. Rocky (A$AP Rocky’s battleship), and more. This tool’s pins follow that dump. Pirate Shop Access is a BR chest prize, not a map pin. Spawn rings are planning markers around named POIs — not pixel-perfect Epic dumps.',
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
          text: 'Hot names: The $.$. Rocky, Arlong Park, Loguetown, and Fortune’s Fort after the 8 Nov Captain’s Day. Balanced: Rubber Resort, Windmill Village, Plunder Port. Filter hot / balanced / edge on this map, then trust in-game labels if anything disagrees.',
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
          text: 'Yes. The minimap image and coordinates load from live Fortnite-API data, so named locations refresh when that dump updates. Editorial loot tips are reviewed around major patches — last Crossbones Isle pass 7 Nov 2026.',
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
      'Interactive Fortnite Treasure Hunters map for Crossbones Isle. Live Fortnite-API pins. Pirate Shop Access is a chest prize, not a POI.',
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
