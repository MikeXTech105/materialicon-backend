const app = require('./app');
const env = require('./config/env.config');
const { connectDatabase } = require('./config/database');
const logger = require('./utils/logger');

let server;

const startServer = async () => {
  try {
    await connectDatabase();

    server = app.listen(env.port, () => {
      logger.info(`IconAPI server running on port ${env.port} in ${env.nodeEnv} mode`);
      logger.info(`Swagger documentation available at http://localhost:${env.port}/api-docs`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};

const shutdown = (signal) => {
  logger.info(`${signal} received. Closing HTTP server gracefully.`);

  if (server) {
    server.close(() => {
      logger.info('HTTP server closed');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled promise rejection', reason);
  shutdown('unhandledRejection');
});
process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception', error);
  process.exit(1);
});

startServer();
