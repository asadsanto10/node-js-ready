import { Server } from 'http';
import socket from 'socket.io';

export const initSocket = (server: Server) => {
	const io = new socket.Server(server, {
		cors: {
			origin: '*',
		},
	});

	// io.emit('tracked-riders', {
	//   hey: 'asd'
	// });

	// io.on('connect', (socket) => {
	// 	console.log(socket.id);
	// });

	io.on('connection', (socket) => {
		console.log(socket.id);
		socket.emit('hello', 'world');
	});
};
