/* eslint-disable no-console */
import { Server } from 'http';
import { logger } from '../shared/logger';

export const uncaughtException = (): void => {
	process.on('uncaughtException', (error) => {
		console.log('uncaughtException is detected::: ', error);
		logger.error(`uncaughtException is detected::: ${error}`);
		process.exit(1);
	});
};

export const unhandledRejection = (server: Server): void => {
	process.on('unhandledRejection', (error) => {
		if (server) {
			server.close(() => {
				console.log('Unhandled rejection is detected::::: ', error);
				logger.error('Unhandled rejection is detected::::: ', error);
				process.exit(1);
			});
		} else {
			process.exit(1);
		}
	});
};

export const sigTerm = (server: Server): void => {
	process.on('SIGTERM', () => {
		console.log('SIGTERM is received...');
		logger.error('SIGTERM is received...');
		if (server) {
			server.close();
		}
	});
};
