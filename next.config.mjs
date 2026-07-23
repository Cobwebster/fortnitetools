/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
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
        destination: '/tools/kd-calculator',
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
    ]
  },
}

export default nextConfig
