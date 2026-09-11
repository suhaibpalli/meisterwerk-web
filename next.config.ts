import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires qualities to be declared explicitly.
    qualities: [75, 90],
    formats: ['image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

export default nextConfig
