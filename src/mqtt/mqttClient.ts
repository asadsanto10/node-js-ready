import mqtt from 'mqtt';
import os from 'node:os';
import { logger } from '../shared/logger';
const protocol = 'mqtt';
const host = 'localhost';
const port = '1883';
const connectUrl = `${protocol}://${host}:${port}`;
const hostname = os.hostname();
export const connectMqttClient = () => {
	const client = mqtt.connect('mqtt://10.70.33.123:1883', {
		// clean: true,
		// clientId: 'sadsadasd',
		// connectTimeout: 4000,
		// reconnectPeriod: 3000,
		// protocolVersion: 5,
		// properties: {
		// 	sessionExpiryInterval: 0xffffffff,
		// },
		// username: 'asad10',
		// password: 'asad10',
		clientId: 'test-client',
		clean: false, // IMPORTANT: persistent session
		// protocolVersion: 5,
		// properties: { sessionExpiryInterval: 255555 },
	});
	// return mqttClient;
	client.on('connect', () => {
		logger.info('MQTT client Connected..');

		client.subscribe(['$queue/test-topic'], () => {
			console.log(`Subscribe to topic test-topic`);
		});
		// for (let i = 0; i < 8; i++) {
		// 	setTimeout(() => {
		// 		client.publish(
		// 			'$delayed/15/test-topic',
		// 			JSON.stringify({
		// 				msg: 'sub' + i,
		// 				time: new Date().toLocaleString(),
		// 			})
		// 		);
		// 		console.log('publish::' + i);
		// 	}, 5000);
		// }
	});

	client.on('message', (topic, payload) => {
		console.log('Received Message:', topic, payload.toString());
		console.log('Process PID:', process.pid);
		console.log('The machine hostname is:', hostname);
	});

	client.on('error', function (err) {
		logger.error('MQTT client Error::' + err);
	});
};
