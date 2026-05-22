const { body, param, query } = require('express-validator');
const { ICON_STATUS, ICON_STYLES, ICON_SORT_FIELDS } = require('../constants/icon.constants');

const iconIdParamValidation = [
  param('id')
    .isInt({ min: 1 }).withMessage('Icon id must be a positive integer')
    .toInt()
];

const tagIdsValidation = body('tag_ids')
  .optional()
  .custom((value) => {
    if (Array.isArray(value)) return value.every((id) => Number.isInteger(Number(id)) && Number(id) > 0);

    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed.every((id) => Number.isInteger(Number(id)) && Number(id) > 0);
      } catch {
        return value.split(',').every((id) => Number.isInteger(Number(id)) && Number(id) > 0);
      }
    }

    return false;
  })
  .withMessage('Tag ids must be an array, JSON array, or comma-separated positive integers');

const createIconValidation = [
  body('name')
    .notEmpty().withMessage('Icon name is required')
    .isLength({ min: 2, max: 150 }).withMessage('Icon name must be between 2 and 150 characters'),
  body('slug')
    .optional()
    .isLength({ min: 2, max: 180 }).withMessage('Slug must be between 2 and 180 characters'),
  body('description')
    .optional({ nullable: true })
    .isLength({ max: 2000 }).withMessage('Description cannot exceed 2000 characters'),
  body('category_id')
    .optional({ nullable: true })
    .isInt({ min: 1 }).withMessage('Category id must be a positive integer')
    .toInt(),
  body('style')
    .optional()
    .isIn(Object.values(ICON_STYLES)).withMessage('Invalid icon style'),
  body('status')
    .optional()
    .isIn(Object.values(ICON_STATUS)).withMessage('Status must be draft or published'),
  body('cdn_url')
    .optional({ nullable: true })
    .isURL({ require_protocol: true }).withMessage('CDN URL must be a valid absolute URL'),
  tagIdsValidation
];

const updateIconValidation = [
  ...iconIdParamValidation,
  body('name')
    .optional()
    .isLength({ min: 2, max: 150 }).withMessage('Icon name must be between 2 and 150 characters'),
  body('slug')
    .optional()
    .isLength({ min: 2, max: 180 }).withMessage('Slug must be between 2 and 180 characters'),
  body('description')
    .optional({ nullable: true })
    .isLength({ max: 2000 }).withMessage('Description cannot exceed 2000 characters'),
  body('category_id')
    .optional({ nullable: true })
    .isInt({ min: 1 }).withMessage('Category id must be a positive integer')
    .toInt(),
  body('style')
    .optional()
    .isIn(Object.values(ICON_STYLES)).withMessage('Invalid icon style'),
  body('status')
    .optional()
    .isIn(Object.values(ICON_STATUS)).withMessage('Status must be draft or published'),
  body('cdn_url')
    .optional({ nullable: true })
    .isURL({ require_protocol: true }).withMessage('CDN URL must be a valid absolute URL'),
  tagIdsValidation
];

const listIconsValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer').toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100').toInt(),
  query('search').optional().isLength({ max: 150 }).withMessage('Search cannot exceed 150 characters'),
  query('category_id').optional().isInt({ min: 1 }).withMessage('Category id must be a positive integer').toInt(),
  query('style').optional().isIn(Object.values(ICON_STYLES)).withMessage('Invalid icon style'),
  query('status').optional().isIn(Object.values(ICON_STATUS)).withMessage('Status must be draft or published'),
  query('sortBy').optional().isIn(ICON_SORT_FIELDS).withMessage('Invalid sort field'),
  query('sortOrder').optional().isIn(['ASC', 'DESC', 'asc', 'desc']).withMessage('Sort order must be ASC or DESC')
];

module.exports = {
  iconIdParamValidation,
  createIconValidation,
  updateIconValidation,
  listIconsValidation
};
