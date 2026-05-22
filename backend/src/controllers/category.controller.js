const httpStatus = require('../constants/httpStatus.constants');
const messages = require('../constants/message.constants');
const apiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const CategoryService = require('../services/category.service');
const { getRequestContext } = require('../helpers/requestContext.helper');

const listCategories = asyncHandler(async (_req, res) => {
  const categories = await CategoryService.listCategories();

  return apiResponse.success(res, httpStatus.OK, messages.CATEGORY.LIST_FETCHED, categories);
});

const createCategory = asyncHandler(async (req, res) => {
  const category = await CategoryService.createCategory(req.body, req.user, getRequestContext(req));

  return apiResponse.success(res, httpStatus.CREATED, messages.CATEGORY.CREATED, category);
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await CategoryService.updateCategory(req.params.id, req.body, req.user, getRequestContext(req));

  return apiResponse.success(res, httpStatus.OK, messages.CATEGORY.UPDATED, category);
});

const deleteCategory = asyncHandler(async (req, res) => {
  await CategoryService.deleteCategory(req.params.id);

  return apiResponse.success(res, httpStatus.OK, messages.CATEGORY.DELETED, {});
});

module.exports = {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
