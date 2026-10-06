import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: { optimizePackageImports: ["gsap"] },
};

export default nextConfig;
