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
