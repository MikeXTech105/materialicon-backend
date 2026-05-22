const rateLimit = require('express-rate-limit');
const env = require('../config/env.config');
const httpStatus = require('../constants/httpStatus.constants');

const apiLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => res.status(httpStatus.TOO_MANY_REQUESTS).json({
    success: false,
    message: 'Too many requests, please try again later',
    errors: []
  })
});

module.exports = apiLimiter;
