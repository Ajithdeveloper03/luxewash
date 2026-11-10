import type { NextConfig } from "next";

const basePath = "/laundry-demo";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};
export default nextConfig;