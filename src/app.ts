/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import cors from 'cors';
import express, { Application } from 'express';

import cookieParser from 'cookie-parser';
import { Server } from 'http';
import globalErrorHandler from './app/middlewares/globalError/globalErrorHandler.middleware';
import router from './app/routes/router';

import { connectQueue, sendData } from './rabbitMQ/initMQ';
import { consumeQueue } from './recive';
import { uncaughtException, unhandledRejection } from './rejectionHandel/rejectionHandel';
import { logger } from './shared/logger';

let server: Server;

const app: Application = express();
// server port
const port: number | string = process.env.PORT || 5005;

uncaughtException();

// parser
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
// 	fileUpload({
// 		limits: { fileSize: 50 * 1024 * 1024 },
// 	})
// );

// route
const base = '/api/v1';
app.use(base, router);

const queue = 'product_inventory';
const text = {
	item_id: 'macbook',
	text: 'This is a sample message to send receiver to check the ordered Item Availablility',
};

// setTimeout(() => {
// 	(async () => {
// 		try {
// 			const connection = await amqp.connect('amqp://localhost');
// 			const channel = await connection.createChannel();

// 			process.once('SIGINT', async () => {
// 				await channel.close();
// 				await connection.close();
// 			});

// 			await channel.assertQueue(queue, { durable: false });
// 			await channel.consume(
// 				queue,
// 				(message) => {
// 					if (message) {
// 						console.log(" [x] Received '%s'", JSON.parse(message.content.toString()));
// 					}
// 				},
// 				{ noAck: true }
// 			);

// 			console.log(' [*] Waiting for messages. To exit press CTRL+C');
// 		} catch (err) {
// 			console.warn(err);
// 		}
// 	})();
// }, 5000);

// global error
app.use(globalErrorHandler);
connectQueue();
setTimeout(() => {
	sendData({
		name: 'aasdad',
		age: 25,
		city: 'Los Angeles',
	});
}, 1000);

consumeQueue();

// eslint-disable-next-line prefer-const
server = app.listen(port, () => {
	logger.info(`Listening on port ${port}`);
});

// unhandled rejection
unhandledRejection(server);

// sigTerm detection
// sigTerm(server);

export default app;
