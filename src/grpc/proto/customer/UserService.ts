// Original file: src/grpc/customer/customer.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _Empty, Empty__Output as _Empty__Output } from './Empty';
import type { User as _User, User__Output as _User__Output } from './User';
import type { UserId as _UserId, UserId__Output as _UserId__Output } from './UserId';
import type { UserList as _UserList, UserList__Output as _UserList__Output } from './UserList';

export interface UserServiceClient extends grpc.Client {
  Delete(argument: _UserId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_Empty__Output>): grpc.ClientUnaryCall;
  Delete(argument: _UserId, metadata: grpc.Metadata, callback: grpc.requestCallback<_Empty__Output>): grpc.ClientUnaryCall;
  Delete(argument: _UserId, options: grpc.CallOptions, callback: grpc.requestCallback<_Empty__Output>): grpc.ClientUnaryCall;
  Delete(argument: _UserId, callback: grpc.requestCallback<_Empty__Output>): grpc.ClientUnaryCall;
  delete(argument: _UserId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_Empty__Output>): grpc.ClientUnaryCall;
  delete(argument: _UserId, metadata: grpc.Metadata, callback: grpc.requestCallback<_Empty__Output>): grpc.ClientUnaryCall;
  delete(argument: _UserId, options: grpc.CallOptions, callback: grpc.requestCallback<_Empty__Output>): grpc.ClientUnaryCall;
  delete(argument: _UserId, callback: grpc.requestCallback<_Empty__Output>): grpc.ClientUnaryCall;
  
  Get(argument: _UserId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  Get(argument: _UserId, metadata: grpc.Metadata, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  Get(argument: _UserId, options: grpc.CallOptions, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  Get(argument: _UserId, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  get(argument: _UserId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  get(argument: _UserId, metadata: grpc.Metadata, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  get(argument: _UserId, options: grpc.CallOptions, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  get(argument: _UserId, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  
  GetAll(argument: _Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_UserList__Output>): grpc.ClientUnaryCall;
  GetAll(argument: _Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_UserList__Output>): grpc.ClientUnaryCall;
  GetAll(argument: _Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_UserList__Output>): grpc.ClientUnaryCall;
  GetAll(argument: _Empty, callback: grpc.requestCallback<_UserList__Output>): grpc.ClientUnaryCall;
  getAll(argument: _Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_UserList__Output>): grpc.ClientUnaryCall;
  getAll(argument: _Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_UserList__Output>): grpc.ClientUnaryCall;
  getAll(argument: _Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_UserList__Output>): grpc.ClientUnaryCall;
  getAll(argument: _Empty, callback: grpc.requestCallback<_UserList__Output>): grpc.ClientUnaryCall;
  
  Insert(argument: _User, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  Insert(argument: _User, metadata: grpc.Metadata, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  Insert(argument: _User, options: grpc.CallOptions, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  Insert(argument: _User, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  insert(argument: _User, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  insert(argument: _User, metadata: grpc.Metadata, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  insert(argument: _User, options: grpc.CallOptions, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  insert(argument: _User, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  
  Update(argument: _UserId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  Update(argument: _UserId, metadata: grpc.Metadata, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  Update(argument: _UserId, options: grpc.CallOptions, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  Update(argument: _UserId, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  update(argument: _UserId, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  update(argument: _UserId, metadata: grpc.Metadata, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  update(argument: _UserId, options: grpc.CallOptions, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  update(argument: _UserId, callback: grpc.requestCallback<_User__Output>): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  Delete: grpc.handleUnaryCall<_UserId__Output, _Empty>;
  
  Get: grpc.handleUnaryCall<_UserId__Output, _User>;
  
  GetAll: grpc.handleUnaryCall<_Empty__Output, _UserList>;
  
  Insert: grpc.handleUnaryCall<_User__Output, _User>;
  
  Update: grpc.handleUnaryCall<_UserId__Output, _User>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  Delete: MethodDefinition<_UserId, _Empty, _UserId__Output, _Empty__Output>
  Get: MethodDefinition<_UserId, _User, _UserId__Output, _User__Output>
  GetAll: MethodDefinition<_Empty, _UserList, _Empty__Output, _UserList__Output>
  Insert: MethodDefinition<_User, _User, _User__Output, _User__Output>
  Update: MethodDefinition<_UserId, _User, _UserId__Output, _User__Output>
}
