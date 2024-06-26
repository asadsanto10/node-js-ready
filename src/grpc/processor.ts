/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { logger } from '../shared/logger';

const packageDefinition = protoLoader.loadSync(path.join(__dirname, './protos/processing.proto'));
const processingProto = grpc.loadPackageDefinition(packageDefinition);

function process(call) {
	const onboardRequest = call.request;
	const time = onboardRequest.orderId * 1000 + onboardRequest.degreeId * 10;
	call.write({ status: 0 });
	call.write({ status: 1 });
	setTimeout(() => {
		call.write({ status: 2 });
		setTimeout(() => {
			call.write({ status: 3 });
			call.end();
		}, time);
	}, time);
}

const server = new grpc.Server();
server.addService(processingProto.Processing.service, { process });
server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), (error, port) => {
	// server.start();
	if (!error) {
		logger.info(`GRPC server on listening port: ${port}`);
	} else {
		logger.error(`grpc server error: ${error.message}`, { caller: 'bindAsync' });
	}
});
