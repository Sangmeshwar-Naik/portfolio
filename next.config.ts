import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  experimental: {
    cpus: 1,
  },
};

export default nextConfig;
