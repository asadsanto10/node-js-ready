import * as amqp from 'amqplib';
import { logger } from '../../shared/logger';

const exchange = 'new-product';

const fanOutProcess = async (message: any) => {
	try {
		const connection = await amqp.connect('amqp://localhost:5672');
		const channel = await connection.createChannel();
		await channel.assertExchange(exchange, 'fanout', { durable: true });

		channel.publish(exchange, '', Buffer.from(JSON.stringify(message)), { persistent: true });
		logger.info({ message: 'message sent successfully', data: message });

		setTimeout(() => {
			connection.close();
		}, 1000);
	} catch (error) {
		console.log(error);
		logger.error({ message: 'error sent to data', error });
	}
};

fanOutProcess({ productName: 'new-product', value: 15000 });
