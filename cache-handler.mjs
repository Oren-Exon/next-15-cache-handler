import { createClient } from "redis";
import { PHASE_PRODUCTION_BUILD } from "next/constants.js";
import { CacheHandler } from "@fortedigital/nextjs-cache-handler";
import createRedisHandler from "@fortedigital/nextjs-cache-handler/redis-strings";

const isSingleConnectionModeEnabled = Boolean(process.env.REDIS_SINGLE_CONNECTION);

async function setupRedisClient() {
  if (PHASE_PRODUCTION_BUILD !== process.env.NEXT_PHASE) {
    try {
      const redisClient = createClient({
        url: process.env.REDIS_URL,
        pingInterval: 10000,
      });

      redisClient.on("error", (e) => {
        if (process.env.NEXT_PRIVATE_DEBUG_CACHE !== undefined) {
          console.warn("[CacheHandler] Redis error", e);
        }
        if (isSingleConnectionModeEnabled) {
          global.cacheHandlerConfig = null;
          global.cacheHandlerConfigPromise = null;
        }
      });

      console.info("[CacheHandler] Connecting Redis client...");
      await redisClient.connect();
      console.info("[CacheHandler] Redis client connected.");

      if (!redisClient.isReady) {
        console.error("[CacheHandler] Failed to initialize caching layer.");
      }

      return redisClient;
    } catch (error) {
      console.warn("[CacheHandler] Failed to connect Redis client:", error);
      if (redisClient) {
        try {
          redisClient.destroy();
        } catch (e) {
          console.error(
            "[CacheHandler] Failed to quit the Redis client after failing to connect.",
            e
          );
        }
      }
    }
  }

  return null;
}

async function createCacheConfig() {
  const redisClient = await setupRedisClient();

  if (!redisClient) {
    console.error("[CacheHandler] Failed to connect to Redis");
    process.exit(1);
  }

  const redisCacheHandler = createRedisHandler({
    client: redisClient,
    keyPrefix: "nextjs:",
  });

  const config = {
    handlers: [redisCacheHandler],
  };

  if (isSingleConnectionModeEnabled) {
    global.cacheHandlerConfigPromise = null;
    global.cacheHandlerConfig = config;
  }

  return config;
}

CacheHandler.onCreation(() => {
  const promise = createCacheConfig();
  if (isSingleConnectionModeEnabled) {
    global.cacheHandlerConfigPromise = promise;
  }
  return promise;
});

export default CacheHandler;