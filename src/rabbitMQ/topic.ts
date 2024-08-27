import * as amqp from 'amqplib';
import { logger } from '../shared/logger';

const exchange = 'notifiction-exchange';
const routingKey = 'order.place';
const routingKey2 = 'order.process';
const routingKey3 = 'payment.process';
// const queueName = 'queue-1';
// const queueName2 = 'queue-2';

const producerTopic = async (routingKey: string, message: any) => {
	try {
		const connection = await amqp.connect('amqp://localhost:5672');
		const channel = await connection.createChannel();

		await channel.assertExchange(exchange, 'topic', { durable: true });

		channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));

		logger.info({ message: 'message sent successfully', routingKey, data: message });

		setTimeout(() => {
			connection.close();
		}, 1000);
	} catch (error) {
		console.log(error);
		logger.error({ message: 'error sent to data', error });
	}
};
producerTopic(routingKey, { order: 1, status: 'placed' });
producerTopic(routingKey3, { order: 2, status: 'process' });
producerTopic(routingKey, { order: 3, status: 'placed' });
producerTopic(routingKey3, { order: 4, status: 'process' });
producerTopic(routingKey, { order: 5, status: 'placed' });
producerTopic(routingKey3, { order: 6, status: 'process' });
producerTopic(routingKey, { order: 7, status: 'placed' });
producerTopic(routingKey3, { order: 8, status: 'process' });
producerTopic(routingKey, { order: 9, status: 'placed' });
producerTopic(routingKey3, { order: 10, status: 'process' });

// setInterval(() => {
// 	producerTopic(routingKey, { order: 1, status: 'placed' });
// 	producerTopic(routingKey3, { order: 2, status: 'process' });
// 	producerTopic(routingKey, { order: 3, status: 'placed' });
// 	producerTopic(routingKey3, { order: 4, status: 'process' });
// 	producerTopic(routingKey, { order: 5, status: 'placed' });
// 	producerTopic(routingKey3, { order: 6, status: 'process' });
// 	producerTopic(routingKey, { order: 7, status: 'placed' });
// 	producerTopic(routingKey3, { order: 8, status: 'process' });
// 	producerTopic(routingKey, { order: 9, status: 'placed' });
// 	producerTopic(routingKey3, { order: 10, status: 'process' });
// }, 1000);
