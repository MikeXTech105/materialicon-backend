const path = require('path');
const fs = require('fs');
const winston = require('winston');
const env = require('../config/env.config');

const logsDirectory = path.join(__dirname, '..', 'logs');

if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory, { recursive: true });
}

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

const logger = winston.createLogger({
  level: env.nodeEnv === 'production' ? 'info' : 'debug',
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: path.join(logsDirectory, 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join(logsDirectory, 'combined.log')
    })
  ]
});

if (env.nodeEnv !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

module.exports = logger;
