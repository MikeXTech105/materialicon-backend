const env = require('../config/env.config');
const httpStatus = require('../constants/httpStatus.constants');
const messages = require('../constants/message.constants');
const ApiError = require('../utils/apiError');
const apiResponse = require('../utils/apiResponse');
const logger = require('../utils/logger');

const errorConverter = (err, _req, _res, next) => {
  if (err instanceof ApiError) {
    return next(err);
  }

  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || messages.COMMON.INTERNAL_ERROR;

  return next(new ApiError(statusCode, message));
};

const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = statusCode === httpStatus.INTERNAL_SERVER_ERROR && env.nodeEnv === 'production'
    ? messages.COMMON.INTERNAL_ERROR
    : err.message;

  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    path: req.originalUrl,
    statusCode
  });

  const errors = err.errors && err.errors.length ? err.errors : [];

  if (env.nodeEnv === 'development' && statusCode === httpStatus.INTERNAL_SERVER_ERROR) {
    errors.push({ stack: err.stack });
  }

  return apiResponse.error(res, statusCode, message, errors);
};

module.exports = {
  errorConverter,
  errorHandler
};
