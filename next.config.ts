import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Unoptimized: true, lets us avoid hydration errors with arbitrary remote images
    unoptimized: true,
    // If you want to optimize specific domain images later, you can add them here
    domains: [],
    // For more control, you can use remotePatterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'http',
        hostname: 'ik.imagekit.io',
      },
    ],
  },
};

export default nextConfig;
