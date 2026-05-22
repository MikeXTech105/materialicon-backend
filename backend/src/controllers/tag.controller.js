const httpStatus = require('../constants/httpStatus.constants');
const messages = require('../constants/message.constants');
const apiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const TagService = require('../services/tag.service');
const { getRequestContext } = require('../helpers/requestContext.helper');

const listTags = asyncHandler(async (_req, res) => {
  const tags = await TagService.listTags();

  return apiResponse.success(res, httpStatus.OK, messages.TAG.LIST_FETCHED, tags);
});

const createTag = asyncHandler(async (req, res) => {
  const tag = await TagService.createTag(req.body, req.user, getRequestContext(req));

  return apiResponse.success(res, httpStatus.CREATED, messages.TAG.CREATED, tag);
});

module.exports = {
  listTags,
  createTag
};
