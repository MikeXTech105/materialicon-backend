const { body, param, query } = require('express-validator');
const { ICON_STYLES } = require('../constants/icon.constants');

const trackSearchValidation = [
  body('keyword')
    .notEmpty().withMessage('Keyword is required')
    .isLength({ min: 1, max: 180 }).withMessage('Keyword must be between 1 and 180 characters'),
  body('results_count')
    .notEmpty().withMessage('Results count is required')
    .isInt({ min: 0 }).withMessage('Results count must be zero or a positive integer')
    .toInt()
];

const publicIconListValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer').toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100').toInt(),
  query('search').optional().isLength({ max: 150 }).withMessage('Search cannot exceed 150 characters'),
  query('category_id').optional().isInt({ min: 1 }).withMessage('Category id must be a positive integer').toInt(),
  query('category').optional().isLength({ min: 1, max: 160 }).withMessage('Category slug is invalid'),
  query('style').optional().isIn(Object.values(ICON_STYLES)).withMessage('Invalid icon style'),
  query('sortBy')
    .optional()
    .isIn(['name', 'slug', 'style', 'created_at', 'updated_at'])
    .withMessage('Invalid sort field'),
  query('sortOrder').optional().isIn(['ASC', 'DESC', 'asc', 'desc']).withMessage('Sort order must be ASC or DESC')
];

const slugParamValidation = [
  param('slug')
    .notEmpty().withMessage('Slug is required')
    .isLength({ min: 1, max: 180 }).withMessage('Slug is invalid')
];

module.exports = {
  publicIconListValidation,
  slugParamValidation,
  trackSearchValidation
};
