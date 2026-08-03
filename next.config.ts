import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    qualities: [50, 75, 90, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
