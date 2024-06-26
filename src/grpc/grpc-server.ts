import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { ProtoGrpcType } from './proto/customer/customer';

const customerProtoPath = path.join(__dirname, 'proto', 'customer', 'customer.proto');
const packageDefinition = protoLoader.loadSync(customerProtoPath, {
	keepCase: true,
	longs: String,
	enums: String,
	arrays: true,
	defaults: true,
	oneofs: true,
});

export const grpcServer = (): void => {
	const customerProto = grpc.loadPackageDefinition(
		packageDefinition
	) as unknown as grpc.ServiceDefinition<ProtoGrpcType>;
	const server = new grpc.Server();
	server.addService(customerProto.UserService.service, {});
};
