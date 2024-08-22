import * as amqp from 'amqplib';
import { logger } from '../shared/logger';

let channel: amqp.Channel;
let connection: amqp.Connection;

export const connectQueue = async () => {
	try {
		connection = await amqp.connect('amqp://localhost:5672');
		channel = await connection.createChannel();

		await channel.assertQueue('test-queue');
		logger.info({ message: 'Connection established rabitMQ server', caller: 'connectQueue' });
	} catch (error) {
		logger.error({ error: error, caller: 'connectQueue' });
		console.log(error);
	}
};

let count = 0;

export async function sendData(data: any) {
	if (connection && channel) {
		// send data to queue
		channel.sendToQueue('test-queue', Buffer.from(JSON.stringify({ ...data, count: count++ })));

		// close the channel and connection
		// await channel.close();
		// logger.info({ message: 'send to que', caller: 'sendData' });
		// await connection.close();
	}
}
