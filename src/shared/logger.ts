import winston, { format } from 'winston';

const { combine, timestamp, label, printf } = format;

const myFormat = printf(
	({ level, message, label: formateLable, timestamp: formateTimeStamp, ...rest }) => {
		const date = new Date(formateTimeStamp as number);
		const hour = date.getHours();
		const minute = date.getMinutes();
		const second = date.getSeconds();
		const makeLog = {
			label: formateLable,
			level,
			message,
			...rest,
			timestamp: `${date.toDateString()} ${hour}:${minute}:${second}`,
		};

		// return `${date.toDateString()} ${hour}:${minute}:${second} [${formateLable}] ${level}: ${message}`;
		return JSON.stringify(makeLog);
	}
);

export const logger = winston.createLogger({
	level: 'info',
	format: combine(label({ label: 'UNI-API' }), timestamp(), myFormat),
	transports: [
		new winston.transports.Console(),
		// new DailyRotateFile({
		// 	filename: path.join(process.cwd(), 'logs', 'winston', 'success', '%DATE%-success.log'),
		// 	datePattern: 'DD-MM-YYYY HH',
		// 	zippedArchive: true,
		// 	maxSize: '20m',
		// 	maxFiles: '14d',
		// }),
	],
});

export const errorlogger = winston.createLogger({
	level: 'error',
	format: combine(label({ label: 'UNI-API' }), timestamp(), myFormat),
	transports: [
		new winston.transports.Console(),
		// new DailyRotateFile({
		// 	filename: path.join(process.cwd(), 'logs', 'winston', 'errors', '%DATE%-error.log'),
		// 	datePattern: 'DD-MM-YYYY HH',
		// 	zippedArchive: true,
		// 	maxSize: '20m',
		// 	maxFiles: '14d',
		// }),
	],
});
