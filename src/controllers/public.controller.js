const httpStatus = require('../constants/httpStatus.constants');
const messages = require('../constants/message.constants');
const apiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const PublicService = require('../services/public.service');
const { getRequestContext } = require('../helpers/requestContext.helper');

const listIcons = asyncHandler(async (req, res) => {
  const { icons, meta } = await PublicService.listIcons(req.query, req);

  return apiResponse.success(res, httpStatus.OK, messages.PUBLIC.ICONS_FETCHED, icons, meta);
});

const getIconBySlug = asyncHandler(async (req, res) => {
  const icon = await PublicService.getIconBySlug(req.params.slug, req);

  return apiResponse.success(res, httpStatus.OK, messages.PUBLIC.ICON_FETCHED, icon);
});

const listCategories = asyncHandler(async (_req, res) => {
  const categories = await PublicService.listCategories();

  return apiResponse.success(res, httpStatus.OK, messages.PUBLIC.CATEGORIES_FETCHED, categories);
});

const listTags = asyncHandler(async (_req, res) => {
  const tags = await PublicService.listTags();

  return apiResponse.success(res, httpStatus.OK, messages.PUBLIC.TAGS_FETCHED, tags);
});

const trackSearch = asyncHandler(async (req, res) => {
  await PublicService.trackSearch(req.body, getRequestContext(req));

  return apiResponse.success(res, httpStatus.CREATED, messages.PUBLIC.SEARCH_TRACKED, {});
});

const downloadIcon = asyncHandler(async (req, res) => {
  const redirectUrl = await PublicService.trackDownloadAndResolveUrl(
    req.params.slug,
    getRequestContext(req),
    req
  );

  return res.redirect(302, redirectUrl);
});

module.exports = {
  downloadIcon,
  getIconBySlug,
  listCategories,
  listIcons,
  listTags,
  trackSearch
};
