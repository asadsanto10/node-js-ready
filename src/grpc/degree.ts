import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { logger } from '../shared/logger';

const packageDefinition = protoLoader.loadSync(path.join(__dirname, 'protos', 'degree.proto'), {
	keepCase: true,
	longs: String,
	enums: String,
	arrays: true,
	defaults: true,
	oneofs: true,
});

const degreeProto = grpc.loadPackageDefinition(packageDefinition);

const DEGREE = [
	{
		id: 100,
		degreeId: 1000,
		title: 'Engineering',
		major: 'Electronics',
	},
	{
		id: 200,
		degreeId: 2000,
		title: 'Engineering',
		major: 'Computer Science',
	},
	{
		id: 300,
		degreeId: 3000,
		title: 'Engineering',
		major: 'Telecommunication',
	},
	{
		id: 400,
		degreeId: 4000,
		title: 'Commerce',
		major: 'Accounts',
	},
];

const findDegree = (call: any, callback: any) => {
	const degree = DEGREE.find((d) => d.degreeId === call.request.id);

	if (degree) {
		callback(null, degree);
	} else {
		callback({
			message: 'Degree not found',
			code: grpc.status.INVALID_ARGUMENT,
		});
	}
};

const server = new grpc.Server();
server.addService(degreeProto.Degrees.service, { find: findDegree });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
	// server.start();
	if (!error) {
		logger.info(`GRPC server on listening port: ${port}`);
	} else {
		logger.error(`grpc server error: ${error.message}`, { caller: 'bindAsync' });
	}
});
