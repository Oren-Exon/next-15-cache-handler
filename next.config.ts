import type { NextConfig } from "next";

const nextConfig: NextConfig =  {
  /* config options here */
  output: "standalone",
  cacheHandler: "./cache-handler.mjs",
  cacheMaxMemorySize: 0, // disable default in-memory caching
};

export default nextConfig;
