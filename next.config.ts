import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },

  // www → non-www canonical redirect
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.bitsolmarketing.com" }],
        destination: "https://bitsolmarketing.com/:path*",
        permanent: true,
      },
    ];
  },

  // Cache-Control, security, and SEO headers
  async headers() {
    return [
      // Static image assets — 1 year cache
      {
        source: "/:path*\\.(jpg|jpeg|png|gif|webp|svg|ico|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Static font/CSS/JS — 1 year cache
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // All pages — security + SEO headers
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
