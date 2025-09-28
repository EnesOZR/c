/** @type {import('next').NextConfig} */
const repoName = 'c'
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ensure static export works for GitHub Pages
  output: 'export',
  trailingSlash: true,
  basePath: isGithubActions ? `/${repoName}` : '',
  assetPrefix: isGithubActions ? `/${repoName}/` : '',
  images: {
    // Next/Image optimization is not available on GitHub Pages
    unoptimized: true,
  },
}

export default nextConfig
