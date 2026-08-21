import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/api-client-react"],
  images: { unoptimized: true },
};

export default nextConfig;
