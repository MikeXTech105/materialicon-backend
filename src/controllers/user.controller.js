const httpStatus = require('../constants/httpStatus.constants');
const messages = require('../constants/message.constants');
const apiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const UserService = require('../services/user.service');
const { getRequestContext } = require('../helpers/requestContext.helper');

const createUser = asyncHandler(async (req, res) => {
  const user = await UserService.createUser(req.body, req.user, getRequestContext(req));

  return apiResponse.success(res, httpStatus.CREATED, messages.USER.CREATED, user);
});

const listUsers = asyncHandler(async (req, res) => {
  const { users, meta } = await UserService.listUsers(req.query);

  return apiResponse.success(res, httpStatus.OK, messages.USER.LIST_FETCHED, users, meta);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await UserService.getUserById(req.params.id);

  return apiResponse.success(res, httpStatus.OK, messages.USER.FETCHED, user);
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await UserService.updateUser(req.params.id, req.body, req.user, getRequestContext(req));

  return apiResponse.success(res, httpStatus.OK, messages.USER.UPDATED, user);
});

const deleteUser = asyncHandler(async (req, res) => {
  await UserService.deleteUser(req.params.id);

  return apiResponse.success(res, httpStatus.OK, messages.USER.DELETED, {});
});

module.exports = {
  createUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser
};
