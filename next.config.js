/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'logo.clearbit.com', 'asset.brandfetch.io', 'cdn.brandfetch.io', 'api.brandfetch.io', 'img.logo.dev'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
      {
        protocol: 'https',
        hostname: 'asset.brandfetch.io',
      },
      {
        protocol: 'https',
        hostname: 'cdn.brandfetch.io',
      },
      {
        protocol: 'https',
        hostname: 'api.brandfetch.io',
      },
      {
        protocol: 'https',
        hostname: 'img.logo.dev',
      },
    ],
  },
};

module.exports = nextConfig;
