import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/rapier'],
  // Next 16 defaults to Turbopack; empty config acknowledges webpack below is webpack-only.
  turbopack: {},
  webpack: (config) => {
    config.experiments = { ...config.experiments, asyncWebAssembly: true }
    return config
  },
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Accept-Ranges', value: 'bytes' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/:path*.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/fortnite-build-simulator',
        destination: '/tools/fortnite-build-simulator',
        permanent: false,
      },
      {
        source: '/map',
        destination: '/fortnite-map',
        permanent: true,
      },
      {
        source: '/guides/building/fortnite-building-guide-beginners',
        destination: '/guides',
        permanent: true,
      },
      {
        source: '/guides/building/fortnite-advanced-editing-techniques',
        destination: '/guides',
        permanent: true,
      },
      {
        source: '/guides/building/:path*',
        destination: '/guides',
        permanent: true,
      },
      {
        source: '/guides/tools/fortnite-sensitivity-settings-calculator',
        destination: '/tools/sensitivity-calculator',
        permanent: true,
      },
      {
        source: '/guides/tools/fortnite-tracker-how-to-check-stats',
        destination: '/tools/player-stats',
        permanent: true,
      },
      {
        source: '/guides/tools/:path*',
        destination: '/tools',
        permanent: true,
      },
      // Old category id was "guides" → /guides/guides/... (awkward). Now "how-to".
      {
        source: '/guides/guides/fortnite-tips-win-more-games',
        destination: '/guides/how-to/fortnite-ranked-mode-guide',
        permanent: true,
      },
      {
        source: '/guides/guides/:slug',
        destination: '/guides/how-to/:slug',
        permanent: true,
      },
      {
        source: '/guides/guides',
        destination: '/guides/how-to',
        permanent: true,
      },
      {
        source: '/is-fortnite-down',
        destination: '/status',
        permanent: true,
      },
      {
        source: '/tools/battle-pass-xp-calculator',
        destination: '/xp-calculator',
        permanent: true,
      },
      {
        source: '/:locale/tools/battle-pass-xp-calculator',
        destination: '/xp-calculator',
        permanent: true,
      },
      {
        source: '/tools/kd-calculator',
        destination: '/tools/player-stats',
        permanent: true,
      },
      {
        source: '/:locale/tools/kd-calculator',
        destination: '/:locale/tools/player-stats',
        permanent: true,
      },
      {
        source: '/tools/weapon-damage-calculator',
        destination: '/weapons',
        permanent: true,
      },
      {
        source: '/:locale/tools/weapon-damage-calculator',
        destination: '/weapons',
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
