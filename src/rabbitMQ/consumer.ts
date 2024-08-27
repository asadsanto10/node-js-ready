import * as amqp from 'amqplib';
import { logger } from '../shared/logger';

const queueName = 'queue-1';

export const consumer1 = async () => {
	try {
		const connection = await amqp.connect('amqp://localhost:5672');
		const channel = await connection.createChannel();

		await channel.assertQueue(queueName, { durable: false });

		channel.consume(queueName, (msg) => {
			if (!msg) {
				logger.error({ message: 'No message received' });
				return;
			}
			// console.log(msg.content?.toString());
			logger.info({
				message: 'data recived successfully from ::' + queueName,
				data: JSON.parse(msg.content?.toString()),
			});
			channel.ack(msg);
		});
	} catch (error) {
		console.log(error);
		logger.error({ message: 'error sent to data', error });
	}
};
