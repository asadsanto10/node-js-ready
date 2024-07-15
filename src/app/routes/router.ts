import express, { NextFunction, Request, Response } from 'express';

import amqplib from 'amqplib';
import httpStatus from 'http-status';

const router = express.Router();

router.get('/health', (_req, res) => {
	res.json({ message: 'All ok' });
});

const queue = 'product_inventory';
const text = {
	item_id: 'macbook',
	text: 'This is a sample message to send receiver to check the ordered Item Availablility',
};
router.get('/rmq', async (req: Request, res: Response) => {
	// const queue = 'tasks';
	// const conn = await amqplib.connect('amqp://localhost');
	// const ch1 = await conn.createChannel();
	// ch1.assertQueue(queue);

	// ch1.consume(queue, (msg) => {
	// 	console.log({ msg });
	// 	if (msg !== null) {
	// 		console.log('Received:', msg.content.toString());
	// 		ch1.ack(msg);
	// 	} else {
	// 		console.log('Consumer cancelled by server');
	// 	}
	// });

	(async () => {
		let connection;
		try {
			connection = await amqplib.connect('amqp://localhost');
			const channel = await connection.createChannel();

			await channel.assertQueue(queue, { durable: false });
			channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));
			console.log(" [x] Sent '%s'", text);
			await channel.close();
		} catch (err) {
			console.warn(err);
		} finally {
			if (connection) await connection.close();
		}
	})();

	res.json({ message: 'okkk' });
});

// not found route
router.use((req: Request, res: Response, next: NextFunction) => {
	res.status(httpStatus.NOT_FOUND).json({
		status: false,
		message: 'Route not found',
		errorMessage: [
			{
				path: req.originalUrl,
				message: 'API not found!',
			},
		],
	});
	next();
});

export default router;
