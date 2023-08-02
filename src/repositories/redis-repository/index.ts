import redis from "@/config/redis";

async function getRedis(cacheKey: string) {
  return redis.get(cacheKey);
}

async function setRedis(cacheKey: string, data: string) {
  return redis.set(cacheKey, data);
}

const redisRepository = { getRedis, setRedis };

export default redisRepository;
