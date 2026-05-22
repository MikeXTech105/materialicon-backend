const { body, param, query } = require('express-validator');
const { USER_ROLE, USER_STATUS, USER_SORT_FIELDS } = require('../constants/user.constants');

const phoneRegex = /^[0-9+\-\s()]{7,20}$/;

const idParamValidation = [
  param('id')
    .isInt({ min: 1 }).withMessage('User id must be a positive integer')
    .toInt()
];

const createUserValidation = [
  body('first_name')
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2, max: 100 }).withMessage('First name must be between 2 and 100 characters'),
  body('last_name')
    .optional({ nullable: true })
    .isLength({ max: 100 }).withMessage('Last name cannot exceed 100 characters'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be a valid email address')
    .normalizeEmail(),
  body('phone')
    .optional({ nullable: true })
    .matches(phoneRegex).withMessage('Phone must be a valid phone number'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('profile_image')
    .optional({ nullable: true })
    .isURL().withMessage('Profile image must be a valid URL'),
  body('status')
    .optional()
    .isIn(Object.values(USER_STATUS)).withMessage('Status must be active or inactive'),
  body('role')
    .optional()
    .isIn(Object.values(USER_ROLE)).withMessage('Role must be admin, manager, or user')
];

const updateUserValidation = [
  ...idParamValidation,
  body('first_name')
    .optional()
    .isLength({ min: 2, max: 100 }).withMessage('First name must be between 2 and 100 characters'),
  body('last_name')
    .optional({ nullable: true })
    .isLength({ max: 100 }).withMessage('Last name cannot exceed 100 characters'),
  body('email')
    .optional()
    .isEmail().withMessage('Email must be a valid email address')
    .normalizeEmail(),
  body('phone')
    .optional({ nullable: true })
    .matches(phoneRegex).withMessage('Phone must be a valid phone number'),
  body('password')
    .optional()
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('profile_image')
    .optional({ nullable: true })
    .isURL().withMessage('Profile image must be a valid URL'),
  body('status')
    .optional()
    .isIn(Object.values(USER_STATUS)).withMessage('Status must be active or inactive'),
  body('role')
    .optional()
    .isIn(Object.values(USER_ROLE)).withMessage('Role must be admin, manager, or user')
];

const listUsersValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer').toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100').toInt(),
  query('search').optional().isLength({ max: 150 }).withMessage('Search cannot exceed 150 characters'),
  query('status').optional().isIn(Object.values(USER_STATUS)).withMessage('Status must be active or inactive'),
  query('role').optional().isIn(Object.values(USER_ROLE)).withMessage('Role must be admin, manager, or user'),
  query('sortBy').optional().isIn(USER_SORT_FIELDS).withMessage('Invalid sort field'),
  query('sortOrder').optional().isIn(['ASC', 'DESC', 'asc', 'desc']).withMessage('Sort order must be ASC or DESC')
];

module.exports = {
  idParamValidation,
  createUserValidation,
  updateUserValidation,
  listUsersValidation
};
