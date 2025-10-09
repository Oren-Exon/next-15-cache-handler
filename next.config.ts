import type { NextConfig } from "next";

// @ts-expect-error NextConfig is not typed
const nextConfig: NextConfig = () =>
  {
    return  {
      /* config options here */
      output: "standalone",
      cacheHandler: process.env.NODE_ENV === "production" ? "./cache-handler.mjs" : undefined,
      cacheMaxMemorySize: process.env.NODE_ENV === "production" ? 0 : undefined, // disable default in-memory caching,
      rewrites: async () => {
        return [
          {
            source: "/foo/:path*",
            destination: "/lpvs/10000/verticals/best/search/:path*",
          },
        ];
      },
    };
  } 

export default nextConfig;
