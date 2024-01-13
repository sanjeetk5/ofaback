import path from 'path';
import winston from 'winston';
const { combine, timestamp, printf } = winston.format;

const logspath = path.join(__dirname, '..', '..', 'logs');

const myFormat = printf(({ level, message, timestamp }) => `${timestamp}  ${level}: ${message}`);

const date = new Date().getUTCDate();
const filename = `${logspath}/${date}.log`;

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), myFormat),
  transports: [new winston.transports.File({ filename: filename, level: 'info' })],
});

if (process.env.NODE_ENV !== 'production') {
  console.log('*************************');
  logger.add(new winston.transports.Console());
}

export default logger;
