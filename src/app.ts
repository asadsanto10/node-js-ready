/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import cors from 'cors';

import express, { Application } from 'express';

import cookieParser from 'cookie-parser';
import http from 'http';
import globalErrorHandler from './app/middlewares/globalError/globalErrorHandler.middleware';
import router from './app/routes/router';
import { grpcServer } from './grpc/grpc-server';
import './redis/initRedis';
import { redisOperations } from './redis/redis-operation';
import { uncaughtException, unhandledRejection } from './rejectionHandel/rejectionHandel';
import { logger } from './shared/logger';

// let server: Server;

const app: Application = express();
// server port
const port: number | string = process.env.PORT || 50005;

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
const initialLatLong = {
	lat: 23.813791187111953,
	lng: 90.42438266616209,
};

const riderData = [
	{
		lat: 23.81368474319443,
		lng: 90.42747257094724,
		riderid: 1,
	},
	{
		lat: 23.8273460329639,
		lng: 90.41219470839842,
		riderid: 2,
	},
	{
		lat: 23.82264040272535,
		lng: 90.42970416884764,
		riderid: 3,
	},

	{
		lat: 23.82436805171843,
		lng: 90.40532825332029,
		riderid: 4,
	},
	{
		lat: 23.82798033444264,
		lng: 90.43554065566404,
		riderid: 5,
	},
	{
		lat: 23.82075110718496,
		lng: 90.41558429580076,
		riderid: 6,
	},
	{
		lat: 23.82075130718496,
		lng: 90.41558429580076,
		riderid: 7,
	},
	{
		lat: 23.82075140718496,
		lng: 90.41558429580076,
		riderid: 8,
	},
	{
		lat: 23.82075210718496,
		lng: 90.41558429580076,
		riderid: 9,
	},
	{
		lat: 23.82079110718496,
		lng: 90.41558429580076,
		riderid: 10,
	},
];
app.get('/rider', (req, res) => {
	// const randomLat = initialLatLong.lat + (Math.random() - 0.5) * 0.01;
	// const randomLng = initialLatLong.lng + (Math.random() - 0.5) * 0.01;
	function getRandomLatLng(): any {
		// Dhaka city latitude range
		const minLat = 23.7;
		const maxLat = 23.9;

		// Dhaka city longitude range
		const minLng = 90.35;
		const maxLng = 90.45;

		const lat = (Math.random() * (maxLat - minLat) + minLat).toFixed(14);
		const lng = (Math.random() * (maxLng - minLng) + minLng).toFixed(14);

		return { lat: parseFloat(lat), lng: parseFloat(lng) };
	}

	// riderData.forEach((rider) => {
	// 	const randomLatLng = getRandomLatLng();
	// 	rider.lat = randomLatLng.lat;
	// 	rider.lng = randomLatLng.lng;
	// });

	// res.json(riderDatas);

	res.set({
		'Cache-Control': 'no-cache',
		Connection: 'keep-alive',
		'Content-Type': 'text/event-stream',
	});
	res.flushHeaders();

	const sendRandomCoordinates = (): void => {
		const riderDatas = Array.from({ length: 20 }, (_, index) => {
			const { lat, lng } = getRandomLatLng();
			return {
				lat,
				lng,
				riderid: index + 1,
			};
		});
		const data = JSON.stringify(riderDatas);
		res.write(`data: ${data}\n\n`);
	};
	// initally 1st call
	sendRandomCoordinates();

	const intervalId = setInterval(sendRandomCoordinates, 10000);

	// Handle client disconnect
	req.on('close', () => {
		clearInterval(intervalId);
	});
});
app.use(base, router);

// global error
app.use(globalErrorHandler);

const server = http.createServer(app);
// initSocket(server);

grpcServer();
// reds operation
redisOperations();

// eslint-disable-next-line prefer-const
server.listen(port, () => {
	logger.info(`Listening on port ${port}`);
});
uncaughtException();
// unhandled rejection
unhandledRejection(server);

// sigTerm detection
// sigTerm(server);

export default app;
