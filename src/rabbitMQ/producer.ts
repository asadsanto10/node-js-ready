import * as amqp from 'amqplib';
import { logger } from '../shared/logger';

const exchange = 'exchange-1';
const routingKey = 'route-1';
const routingKey2 = 'route-2';
const queueName = 'queue-1';
const queueName2 = 'queue-2';

const producer = async () => {
	try {
		const connection = await amqp.connect('amqp://localhost:5672');
		const channel = await connection.createChannel();

		const message = {
			name: 'asad 22',
			email: 'asadss@example.com',
			pass: 1232,
		};
		await channel.assertExchange(exchange, 'direct', { durable: false });
		//  multiple consumer
		await channel.assertQueue(queueName, { durable: false });
		await channel.assertQueue(queueName2, { durable: false });

		await channel.bindQueue(queueName, exchange, routingKey);
		await channel.bindQueue(queueName2, exchange, routingKey2);

		channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
		channel.publish(exchange, routingKey2, Buffer.from(JSON.stringify(message)));

		logger.info({ message: 'message sent successfully', data: message });

		setTimeout(() => {
			connection.close();
		}, 1000);
	} catch (error) {
		console.log(error);
		logger.error({ message: 'error sent to data', error });
	}
};

producer();
