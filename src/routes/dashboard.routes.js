const express = require('express');
const DashboardController = require('../controllers/dashboard.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const {
  activityQueryValidation,
  recentIconsValidation
} = require('../validations/dashboard.validation');

const router = express.Router();

router.get('/stats', authenticate, DashboardController.getStats);
router.get('/overview', authenticate, DashboardController.getOverview);
router.get('/recent-icons', authenticate, recentIconsValidation, validate, DashboardController.getRecentIcons);
router.get('/charts', authenticate, DashboardController.getCharts);
router.get('/activity', authenticate, activityQueryValidation, validate, DashboardController.getActivity);
router.get('/storage', authenticate, DashboardController.getStorageAnalytics);
router.get('/search-analytics', authenticate, DashboardController.getSearchAnalytics);
router.get('/download-analytics', authenticate, DashboardController.getDownloadAnalytics);
router.get('/system-health', authenticate, DashboardController.getSystemHealth);
router.get('/quick-actions', authenticate, DashboardController.getQuickActions);

module.exports = router;
