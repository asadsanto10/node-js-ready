import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { UserServiceClient as _UserServiceClient, UserServiceDefinition as _UserServiceDefinition } from './UserService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  Empty: MessageTypeDefinition
  User: MessageTypeDefinition
  UserId: MessageTypeDefinition
  UserList: MessageTypeDefinition
  UserService: SubtypeConstructor<typeof grpc.Client, _UserServiceClient> & { service: _UserServiceDefinition }
}

