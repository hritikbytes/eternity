import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    // Allow Next.js to serve optimized images with modern formats
    formats: ["image/avif", "image/webp"],
    // Reasonable device sizes for mobile-first responsive images
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    // Image sizes for fixed-width next/image usage
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    // Keep optimized images cached for 4 hours
    minimumCacheTTL: 14400,
  },

  // Compress assets with gzip for Vercel deployment
  compress: true,

  // Enable React strict mode for catching subtle bugs early
  reactStrictMode: true,

  // Trailing slash consistency
  trailingSlash: false,

  // ─── Vercel Serverless Optimizations ───
  // Reduce cold-start times by disabling powered-by header
  poweredByHeader: false,

  // Server External Packages — keep heavy libs out of the
  // serverless function bundle for faster cold starts on Vercel
  serverExternalPackages: ["@supabase/supabase-js"],

  // ─── Production Logging ───
  logging: {
    fetches: {
      fullUrl: false,
    },
  },

  // Power-user headers for better caching and security on Vercel
  // Note: /_next/static caching is handled automatically by Vercel
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Cache public images
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        // Cache fonts aggressively
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
