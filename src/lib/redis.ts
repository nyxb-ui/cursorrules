import "server-only"

import { Redis } from "@upstash/redis"

let redis: Redis | undefined

export function getRedisClient() {
   if (!redis) {
      if (
         !process.env.UPSTASH_REDIS_REST_URL ||
         !process.env.UPSTASH_REDIS_REST_TOKEN
      ) {
         throw new Error("Redis environment variables are not set")
      }

      redis = new Redis({
         url: process.env.UPSTASH_REDIS_REST_URL,
         token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
   }
   return redis
}
