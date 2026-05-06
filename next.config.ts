import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
      {
        source: "/merchant-manifest.webmanifest",
        headers: [
          {
            key: "Content-Type",
            value: "application/manifest+json; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/ordering",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/reservation",
        destination: "/booking",
        permanent: true,
      },
      {
        source: "/review",
        destination: "/reviews",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/faqs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
