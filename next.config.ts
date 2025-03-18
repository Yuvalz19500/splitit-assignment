import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: '/',
      destination: '/dashboard/users',
      permanent: true,
    },
    {
      source: '/dashboard',
      destination: '/dashboard/users',
      permanent: true,
    },
  ],
};

export default nextConfig;
