const { body, param } = require('express-validator');
const { CATEGORY_STATUS } = require('../constants/icon.constants');

const categoryIdParamValidation = [
  param('id')
    .isInt({ min: 1 }).withMessage('Category id must be a positive integer')
    .toInt()
];

const createCategoryValidation = [
  body('name')
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 2, max: 120 }).withMessage('Category name must be between 2 and 120 characters'),
  body('slug')
    .optional()
    .isLength({ min: 2, max: 160 }).withMessage('Slug must be between 2 and 160 characters'),
  body('description')
    .optional({ nullable: true })
    .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
  body('status')
    .optional()
    .isIn(Object.values(CATEGORY_STATUS)).withMessage('Status must be active or inactive')
];

const updateCategoryValidation = [
  ...categoryIdParamValidation,
  body('name')
    .optional()
    .isLength({ min: 2, max: 120 }).withMessage('Category name must be between 2 and 120 characters'),
  body('slug')
    .optional()
    .isLength({ min: 2, max: 160 }).withMessage('Slug must be between 2 and 160 characters'),
  body('description')
    .optional({ nullable: true })
    .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
  body('status')
    .optional()
    .isIn(Object.values(CATEGORY_STATUS)).withMessage('Status must be active or inactive')
];

module.exports = {
  categoryIdParamValidation,
  createCategoryValidation,
  updateCategoryValidation
};
