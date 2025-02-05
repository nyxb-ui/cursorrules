/** @type {import('next').NextConfig} */
const nextConfig = {
   output: "standalone",
   experimental: {
      outputFileTracingRoot: process.cwd(),
   },
   env: {
      UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
      UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
   },
}

export default nextConfig
