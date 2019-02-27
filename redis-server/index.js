const redis = require('redis')

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  retry_strategy: () => 100
})

const sub = redisClient.duplicate()

sub.subscribe('insert')