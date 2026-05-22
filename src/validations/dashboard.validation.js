const { query } = require('express-validator');

const activityQueryValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer').toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100').toInt(),
  query('module').optional().isLength({ min: 2, max: 80 }).withMessage('Module filter is invalid'),
  query('action').optional().isLength({ min: 2, max: 80 }).withMessage('Action filter is invalid')
];

const recentIconsValidation = [
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50').toInt()
];

module.exports = {
  activityQueryValidation,
  recentIconsValidation
};
