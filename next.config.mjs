/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  basePath: '/c',
  assetPrefix: '/c/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
