const httpStatus = require('../constants/httpStatus.constants');
const messages = require('../constants/message.constants');
const apiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const DashboardService = require('../services/dashboard.service');
const ActivityLogService = require('../services/activityLog.service');

const getStats = asyncHandler(async (_req, res) => {
  const stats = await DashboardService.getStats();

  return apiResponse.success(res, httpStatus.OK, messages.DASHBOARD.STATS_FETCHED, stats);
});

const getOverview = asyncHandler(async (_req, res) => {
  const overview = await DashboardService.getOverview();

  return apiResponse.success(res, httpStatus.OK, messages.DASHBOARD.OVERVIEW_FETCHED, overview);
});

const getRecentIcons = asyncHandler(async (req, res) => {
  const icons = await DashboardService.getRecentIcons(req.query, req);

  return apiResponse.success(res, httpStatus.OK, messages.DASHBOARD.RECENT_ICONS_FETCHED, icons);
});

const getCharts = asyncHandler(async (_req, res) => {
  const charts = await DashboardService.getCharts();

  return apiResponse.success(res, httpStatus.OK, messages.DASHBOARD.CHARTS_FETCHED, charts);
});

const getActivity = asyncHandler(async (req, res) => {
  const { activities, meta } = await ActivityLogService.listActivity(req.query);

  return apiResponse.success(res, httpStatus.OK, messages.DASHBOARD.ACTIVITY_FETCHED, activities, meta);
});

const getStorageAnalytics = asyncHandler(async (_req, res) => {
  const storage = await DashboardService.getStorageAnalytics();

  return apiResponse.success(res, httpStatus.OK, messages.DASHBOARD.STORAGE_FETCHED, storage);
});

const getSearchAnalytics = asyncHandler(async (_req, res) => {
  const analytics = await DashboardService.getSearchAnalytics();

  return apiResponse.success(res, httpStatus.OK, messages.DASHBOARD.SEARCH_ANALYTICS_FETCHED, analytics);
});

const getDownloadAnalytics = asyncHandler(async (_req, res) => {
  const analytics = await DashboardService.getDownloadAnalytics();

  return apiResponse.success(res, httpStatus.OK, messages.DASHBOARD.DOWNLOAD_ANALYTICS_FETCHED, analytics);
});

const getSystemHealth = asyncHandler(async (_req, res) => {
  const health = await DashboardService.getSystemHealth();

  return apiResponse.success(res, httpStatus.OK, messages.DASHBOARD.SYSTEM_HEALTH_FETCHED, health);
});

const getQuickActions = asyncHandler(async (_req, res) => {
  const quickActions = await DashboardService.getQuickActions();

  return apiResponse.success(res, httpStatus.OK, messages.DASHBOARD.QUICK_ACTIONS_FETCHED, quickActions);
});

module.exports = {
  getActivity,
  getCharts,
  getDownloadAnalytics,
  getOverview,
  getQuickActions,
  getRecentIcons,
  getSearchAnalytics,
  getStats,
  getStorageAnalytics,
  getSystemHealth
};
