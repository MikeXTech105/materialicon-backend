const cron = require('node-cron');
const logger = require('./logger');

const scheduledJobs = new Map();

const registerCronJob = (name, expression, task, options = {}) => {
  if (scheduledJobs.has(name)) {
    throw new Error(`Cron job "${name}" is already registered`);
  }

  const job = cron.schedule(expression, async () => {
    try {
      await task();
    } catch (error) {
      logger.error(`Cron job "${name}" failed`, error);
    }
  }, {
    scheduled: false,
    ...options
  });

  scheduledJobs.set(name, job);
  return job;
};

module.exports = {
  registerCronJob,
  scheduledJobs
};
