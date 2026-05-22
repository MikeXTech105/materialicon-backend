const httpStatus = require('../constants/httpStatus.constants');
const messages = require('../constants/message.constants');
const apiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const AuthService = require('../services/auth.service');
const { getRequestContext } = require('../helpers/requestContext.helper');

const login = asyncHandler(async (req, res) => {
  const data = await AuthService.login(req.body, getRequestContext(req));

  return apiResponse.success(res, httpStatus.OK, messages.AUTH.LOGIN_SUCCESS, data);
});

module.exports = {
  login
};
