import { createClient } from "redis";

class RedisCache {
  public static client = createClient({
    url: process.env.REDIS_URL,
  });
  public static async init() {
    try {
      await RedisCache.client.connect();
      console.log("Redis connection has been established successfully.");
      return true;
    } catch (error) {
      console.error("Unable to connect to the redis database:", error);
      return false;
    }
  }

  public static async disconnect(): Promise<void> {
    await RedisCache.client.disconnect();
  }
}

export default RedisCache;
