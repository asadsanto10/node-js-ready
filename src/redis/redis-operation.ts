import redis from './initRedis';

export const redisOperations = async () => {
	try {
		redis.set('bike:1', 'bike');
		redis.mset(['lang:1', 'js', 'lang:2', 'react']);
		redis.set('count', 0);
		redis.incr('count');
		redis.incr('count');
		redis.incrby('count', 10);
		redis.expire('count', 10);
		const d = await redis.mget(['bike:1', 'lang:1', 'count']);
		console.log({ d });
	} catch (error) {
		console.log(error);
	}
};
