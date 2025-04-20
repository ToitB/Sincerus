// next.config.ts

import { NextConfig } from 'next'; // Import the NextConfig type

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = { // Use the imported type
  // Add the 'images' configuration
  images: {
    // Use remotePatterns for more flexible hostname matching
    remotePatterns: [
      {
        protocol: 'https', // The protocol used by Contentful images (keeping for reference)
        hostname: 'images.ctfassets.net', // The hostname for Contentful images (keeping for reference)
        pathname: '/**', // Allow any path under this hostname
      },
      // Add the configuration for your local Strapi instance
      {
        protocol: 'http', // Use http for local development
        hostname: 'localhost', // The hostname for your local Strapi server
        port: '1337', // The port your local Strapi server runs on
        pathname: '/uploads/**', // Allow images from the /uploads path (where Strapi stores media)
      },
      // Add other external image hostnames here if needed in the future
      // {
      //   protocol: 'https',
      //   hostname: 'another-image-host.com',
      //   pathname: '/**',
      // },
    ],
    // Alternatively, you could use the 'domains' array for simpler cases,
    // but remotePatterns is more powerful.
    // domains: ['images.ctfassets.net'], // Keeping for reference
  },
  // Add other Next.js configurations here if you have them
  // reactStrictMode: true,
};

// Use export default for TypeScript config files
export default nextConfig;
