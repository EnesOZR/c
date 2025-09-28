/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true'
const repoBasePath = '/c'

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  basePath: isGithubPages ? repoBasePath : '',
  assetPrefix: isGithubPages ? `${repoBasePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
