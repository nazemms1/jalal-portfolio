import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/jalal-portfolio",
  assetPrefix: "/jalal-portfolio/",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
