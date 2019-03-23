const redis = require('redis')

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  retry_strategy: () => 100
})

const sub = redisClient.duplicate()
sub.on('message', (channel, message) => {
  console.log(channel, message)
  // redisClient.hset('users', message, message)
})

sub.subscribe('insert')