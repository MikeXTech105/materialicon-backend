const httpStatus = require('../constants/httpStatus.constants');
const messages = require('../constants/message.constants');
const ApiError = require('../utils/apiError');

const notFound = (req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, `${messages.COMMON.ROUTE_NOT_FOUND}: ${req.originalUrl}`));
};

module.exports = notFound;
