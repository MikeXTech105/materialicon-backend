const httpStatus = require('../constants/httpStatus.constants');
const messages = require('../constants/message.constants');
const apiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const IconService = require('../services/icon.service');
const { getRequestContext } = require('../helpers/requestContext.helper');

const listIcons = asyncHandler(async (req, res) => {
  const { icons, meta } = await IconService.listIcons(req.query, req);

  return apiResponse.success(res, httpStatus.OK, messages.ICON.LIST_FETCHED, icons, meta);
});

const getIconById = asyncHandler(async (req, res) => {
  const icon = await IconService.getIconById(req.params.id, req);

  return apiResponse.success(res, httpStatus.OK, messages.ICON.FETCHED, icon);
});

const createIcon = asyncHandler(async (req, res) => {
  const icon = await IconService.createIcon(req.body, req.file, req.user, req, getRequestContext(req));

  return apiResponse.success(res, httpStatus.CREATED, messages.ICON.CREATED, icon);
});

const updateIcon = asyncHandler(async (req, res) => {
  const icon = await IconService.updateIcon(req.params.id, req.body, req.file, req.user, req, getRequestContext(req));

  return apiResponse.success(res, httpStatus.OK, messages.ICON.UPDATED, icon);
});

const deleteIcon = asyncHandler(async (req, res) => {
  await IconService.deleteIcon(req.params.id, req.user, getRequestContext(req));

  return apiResponse.success(res, httpStatus.OK, messages.ICON.DELETED, {});
});

module.exports = {
  listIcons,
  getIconById,
  createIcon,
  updateIcon,
  deleteIcon
};
