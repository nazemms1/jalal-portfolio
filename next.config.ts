import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  ...(isProd && { output: "export" }),
  basePath: isProd ? "/jalal-portfolio" : "",
  assetPrefix: isProd ? "/jalal-portfolio/" : "",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
