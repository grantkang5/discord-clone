import 'dotenv/config'

export default {
  host: process.env.REDIS_HOS!,
  port: parseInt(process.env.REDIS_PORT!),
  retry_strategy: () => 100
}
