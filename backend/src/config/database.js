const { Sequelize } = require('sequelize');
const env = require('./env.config');
const logger = require('../utils/logger');

const sequelize = new Sequelize(env.db.name, env.db.user, env.db.password, {
  host: env.db.host,
  port: env.db.port,
  dialect: 'mysql',
  logging: env.nodeEnv === 'development' ? (message) => logger.debug(message) : false,
  define: {
    underscored: true,
    timestamps: true
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    charset: 'utf8mb4'
  }
});

const connectDatabase = async () => {
  await sequelize.authenticate();
  logger.info('Database connection established successfully');
};

module.exports = {
  sequelize,
  connectDatabase
};
