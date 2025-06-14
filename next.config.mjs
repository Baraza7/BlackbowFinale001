/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/BlackbowFinale001',
  assetPrefix: '/BlackbowFinale001/',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
