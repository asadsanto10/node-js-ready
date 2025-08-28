import cors from 'cors';
import express, { Application } from 'express';

import cookieParser from 'cookie-parser';
import { Server } from 'http';
import router from './app/routes/router';

import { connectMqttClient } from './mqtt/mqttClient';
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
connectMqttClient();

server = app.listen(port, () => {
	logger.info(`Listening on port ${port}`);
});

// setInterval(() => {
// 	const memoryUsage = process.memoryUsage();
// 	const cpuUsage = process.cpuUsage();

// 	console.log('=== Resource Usage ===');
// 	console.log(`RSS: ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`);
// 	console.log(`Heap Used: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
// 	console.log(`Heap Total: ${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
// 	console.log(`External: ${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`);
// 	console.log(`CPU User: ${cpuUsage.user / 1000} ms`);
// 	console.log(`CPU System: ${cpuUsage.system / 1000} ms`);
// 	console.log('=====================');
// }, 3000);

unhandledRejection(server);

export default app;
