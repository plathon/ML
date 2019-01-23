import redis from 'redis'

const redisConf = { 
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT
//	password: process.env.REDIS_PASS
}

export default redis.createClient(redisConf)