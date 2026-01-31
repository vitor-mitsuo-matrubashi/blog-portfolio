// ===========================================
// next.config.ts - Next.js Configuration
// This file configures how Next.js builds and runs your app
// ===========================================

import type { NextConfig } from "next";

// Import Contentlayer plugin to integrate MDX processing with Next.js
// This allows Next.js to understand and process our MDX content files
import { withContentlayer } from "next-contentlayer2";

// ------------------------------------
// Next.js Configuration Object
// Contains settings that affect the entire application
// ------------------------------------
const nextConfig: NextConfig = {
  // 'reactStrictMode' enables extra checks during development
  // Helps find potential problems in your React code
  reactStrictMode: true,

  // Empty turbopack config to allow build with webpack (required for Contentlayer)
  turbopack: {},

  // 'images' configures Next.js Image Optimization
  // We need to whitelist external image domains for security
  images: {
    // 'remotePatterns' allows images from specific external sources
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // Allows using free stock images from Unsplash
      },
      {
        protocol: "https",
        hostname: "github.com",
        // Allows using GitHub avatars and images
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        // Allows using raw images from GitHub repositories
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        // Allows using images from Wikipedia/Wikimedia
      },
    ],
  },
};

// ------------------------------------
// Export with Contentlayer wrapper
// withContentlayer() wraps our config to enable MDX processing
// This is required for Contentlayer to work with Next.js
// ------------------------------------
export default withContentlayer(nextConfig);
