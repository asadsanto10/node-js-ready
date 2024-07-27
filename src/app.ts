/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import cluster from 'cluster';
import cors from 'cors';
import express, { Application } from 'express';
import os from 'os';

import cookieParser from 'cookie-parser';
import { Server } from 'http';
import globalErrorHandler from './app/middlewares/globalError/globalErrorHandler.middleware';
import router from './app/routes/router';

import { sigTerm, uncaughtException, unhandledRejection } from './rejectionHandel/rejectionHandel';
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

// ?? cluster
const numberOfCpu = os.cpus().length;
app.get('/cluster', (req, res) => {
	// console.log(numberOfCpu);
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < 1e8; i++) {}
	res.send({ message: `Cluster is running and pid is: ${process.pid}` });
	// cluster.worker?.kill();
});

if (cluster.isPrimary) {
	for (let i = 0; i < numberOfCpu; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
		cluster.fork();
	});
} else {
	// global error
	app.use(globalErrorHandler);

	// eslint-disable-next-line prefer-const
	server = app.listen(port, () => {
		logger.info(`Listening on port ${port} ans server ${process.pid}`);
	});

	// unhandled rejection
	unhandledRejection(server);

	// sigTerm detection
	sigTerm(server);
}
export default app;
