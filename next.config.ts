import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configured for Hostinger subfolder: /luxewash
  basePath: "/luxewash",
  assetPrefix: "/luxewash",
  trailingSlash: true,
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
