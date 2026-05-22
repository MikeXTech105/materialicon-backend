const { validationResult } = require('express-validator');
const httpStatus = require('../constants/httpStatus.constants');
const messages = require('../constants/message.constants');
const ApiError = require('../utils/apiError');

const validate = (req, _res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  const errors = result.array().map((error) => ({
    field: error.path,
    message: error.msg,
    value: error.value
  }));

  return next(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, messages.COMMON.VALIDATION_FAILED, errors));
};

module.exports = validate;
