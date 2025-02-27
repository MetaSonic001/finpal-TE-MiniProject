import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint errors during production build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors during production build
  },
  images: {
    domains: ['raw.githubusercontent.com', 'images.unsplash.com'],
    // Or using remotePatterns (recommended for newer Next.js versions):
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'raw.githubusercontent.com',
    //     pathname: '/**',
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'images.unsplash.com',
    //     pathname: '/**',
    //   },
    // ],
  },
};

export default nextConfig;