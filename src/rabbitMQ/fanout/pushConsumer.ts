import * as amqp from 'amqplib';
import { logger } from '../../shared/logger';

const exchange = 'new-product';

export const pushConsumer = async () => {
	try {
		const connection = await amqp.connect('amqp://localhost:5672');
		const channel = await connection.createChannel();

		await channel.assertExchange(exchange, 'fanout', { durable: true });
		const q = await channel.assertQueue('', { exclusive: true });
		channel.bindQueue(q.queue, exchange, '');

		logger.info({
			message: 'waiting for push consumer data data',
		});

		channel.consume(q.queue, (msg) => {
			if (!msg) {
				logger.error({ message: 'No message received' });
				return;
			}
			// console.log(msg.content?.toString());
			logger.info({
				message: 'push consumer :: data recived successfully from ::' + q.queue,
				data: msg.content?.toString(),
			});
			channel.ack(msg);
		});
	} catch (error) {
		console.log(error);
		logger.error({ message: 'error sent to data', error });
	}
};
