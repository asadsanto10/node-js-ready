import * as amqp from 'amqplib';
import { logger } from '../../shared/logger';

const queueName = 'order-queue';
const exchange = 'notifiction-exchange';

export const topiOrderConsumer = async () => {
	try {
		const connection = await amqp.connect('amqp://localhost:5672');
		const channel = await connection.createChannel();

		await channel.assertExchange(exchange, 'topic', { durable: true });
		const q = await channel.assertQueue(queueName, { durable: true });
		await channel.bindQueue(q.queue, exchange, 'order.*');

		logger.info({
			message: 'waiting for order data',
		});

		channel.consume(queueName, (msg) => {
			if (!msg) {
				logger.error({ message: 'No message received' });
				return;
			}
			// console.log(msg.content?.toString());
			logger.info({
				message: 'data recived successfully from ::' + queueName,
				data: JSON.parse(msg.content?.toString()),
				route: msg.fields.routingKey,
			});
			channel.ack(msg);
		});
	} catch (error) {
		console.log(error);
		logger.error({ message: 'error sent to data', error });
	}
};
