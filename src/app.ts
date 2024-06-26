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

import { grpcServer } from './grpc/grpc-server';
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

// global error
app.use(globalErrorHandler);

// eslint-disable-next-line prefer-const
server = app.listen(port, () => {
	logger.info(`Listening on port ${port}`);
});
grpcServer();

// unhandled rejection
unhandledRejection(server);

// sigTerm detection
sigTerm(server);

export default app;
