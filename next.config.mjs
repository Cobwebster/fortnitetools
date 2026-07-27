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
        source: '/sprites',
        destination: '/guides/how-to/how-to-extract-sprites-fortnite',
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
