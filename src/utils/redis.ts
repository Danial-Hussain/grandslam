import Redis from "ioredis";

const REDIS_PASSWORD = process.env.REDIS_PASS;
const REDIS_ENDPOINT = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;

const redis = new Redis(
  `redis://:${REDIS_PASSWORD}@${REDIS_ENDPOINT}:${REDIS_PORT}`
);

export default redis;
