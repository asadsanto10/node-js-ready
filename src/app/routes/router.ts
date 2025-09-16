import express, { NextFunction, Request, Response } from 'express';
import os from 'node:os';

import amqplib from 'amqplib';
import httpStatus from 'http-status';
import fs from 'node:fs';
const router = express.Router();
const hostname = os.hostname();
router.get('/health', (_req, res) => {
	res.json({ message: 'All ok', process: process.pid, hostname });
	console.log('Process PID:', process.pid);
	console.log('The machine hostname is:', hostname);
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

router.post('/mqtt/auth', async (req: Request, res: Response) => {
	console.log(req.body);

	// res.status(200).json({ body: req.body });
	res.status(200).json(
		// {
		// 	result: 'allow',
		// 	is_superuser: false,
		// 	acl: [
		// 		{
		// 			permission: 'allow',
		// 			action: 'publish',
		// 			topic: 'test-topic',
		// 		},
		// 		// {
		// 		// 	action: 'subscribe',
		// 		// 	topic: 'devices/${clientid}/#',
		// 		// },
		// 	],
		// 	// acl: [
		// 	// 	{ permission: 'allow', action: 'publish', topic: 'test-topic' },
		// 	// { permission: 'allow', action: 'subscribe', topic: 'commands/#' },
		// 	// ],
		// }

		{
			result: 'allow', // "allow" | "deny" | "ignore"
			is_superuser: false, // options: true | false, default value: false
			// client_attrs: {
			// 	// optional (since v5.7.0)
			// 	role: 'admin',
			// 	sn: '10c61f1a1f47',
			// },
			// expire_at: 1654254601, // optional (since v5.8.0)
			// optional (since v5.8.0)
			acl: [
				{
					permission: 'allow',
					action: 'subscribe',
					topic: 'test-topic',
				},
				// {
				// 	permission: 'deny',
				// 	action: 'publish',
				// 	topic: 'test-topic',
				// },
				// {
				// 	permission: 'deny',
				// 	action: 'all',
				// 	topic: 't/3',
				// },
			],
		}
	);
	// res.status(200).json({ result: 'deny' });
});

router.get('/file', async (req: Request, res: Response) => {
	const readFileStream = fs.createReadStream('test-file.txt');
	res.setHeader('Content-Type', 'text/plain; charset=utf-8');
	// readFileStream.pipe(res);

	readFileStream.on('error', (err) => {
		console.error('Stream error:', err);
		res.status(500).end('Server error');
	});

	// const read = fs.readFileSync('test-file.txt');
	// // res.setHeader('Content-Type', 'text/plain; charset=utf-8');
	// res.end(read);
	res.json('0k');
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
