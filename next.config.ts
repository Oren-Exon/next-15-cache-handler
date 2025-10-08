import type { NextConfig } from "next";

const nextConfig: NextConfig = () =>
  {
    return  {
      /* config options here */
      output: "standalone",
      cacheHandler: process.env.NODE_ENV === "production" ? "./cache-handler.mjs" : undefined,
      cacheMaxMemorySize: process.env.NODE_ENV === "production" ? 0 : undefined, // disable default in-memory caching
    };
  } 

export default nextConfig;
