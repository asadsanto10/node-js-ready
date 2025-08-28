import mqtt from 'mqtt';
import { logger } from '../shared/logger';

const protocol = 'mqtt';
const host = 'localhost';
const port = '1883';
const connectUrl = `${protocol}://${host}:${port}`;

export const connectMqttClient = () => {
	const client = mqtt.connect(connectUrl, {
		clean: false,
		clientId: 'sadsadasd',
		connectTimeout: 4000,
		reconnectPeriod: 3000,
		protocolVersion: 5,
		properties: {
			sessionExpiryInterval: 0xffffffff,
		},
		// username: 'asad10',
		// password: 'asad10',
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
	});

	client.on('error', function (err) {
		// logger.error('MQTT client Error::' + err);
	});
};
