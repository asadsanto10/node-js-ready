import redis from './initRedis';

export const redisOperations = async () => {
	try {
		redis.set('test', 'asadas');
		const d = await redis.get('test');
		console.log({ d });
	} catch (error) {
		console.log(error);
	}
};
