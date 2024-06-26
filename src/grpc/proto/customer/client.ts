import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const packageDefinition = protoLoader.loadSync(path.join(__dirname, 'protos', 'degree.proto'), {
	keepCase: true,
	longs: String,
	enums: String,
	arrays: true,
	defaults: true,
	oneofs: true,
});
