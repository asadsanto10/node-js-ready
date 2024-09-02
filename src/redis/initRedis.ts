import Redis from 'ioredis';
import { logger } from '../shared/logger';
const redis = new Redis();

redis.on('connect', () => {
	logger.info({ message: 'Redis connection established', caller: 'Redis connection' });
});

redis.on('error', (err) => {
	logger.error({ message: `Redis error:: ${err}`, caller: 'Redis connection' });
});

export default redis;
