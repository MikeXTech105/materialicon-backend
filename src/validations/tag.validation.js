const { body } = require('express-validator');

const createTagValidation = [
  body('name')
    .notEmpty().withMessage('Tag name is required')
    .isLength({ min: 2, max: 120 }).withMessage('Tag name must be between 2 and 120 characters'),
  body('slug')
    .optional()
    .isLength({ min: 2, max: 160 }).withMessage('Slug must be between 2 and 160 characters')
];

module.exports = {
  createTagValidation
};
