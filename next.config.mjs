/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Vercel: use default output (server functions enabled)
  images: {
    unoptimized: false,
  },
}

export default nextConfig
