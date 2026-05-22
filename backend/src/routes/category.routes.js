const express = require('express');
const CategoryController = require('../controllers/category.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const {
  categoryIdParamValidation,
  createCategoryValidation,
  updateCategoryValidation
} = require('../validations/category.validation');

const router = express.Router();

router
  .route('/')
  .get(authenticate, CategoryController.listCategories)
  .post(authenticate, createCategoryValidation, validate, CategoryController.createCategory);

router
  .route('/:id')
  .put(authenticate, updateCategoryValidation, validate, CategoryController.updateCategory)
  .delete(authenticate, categoryIdParamValidation, validate, CategoryController.deleteCategory);

module.exports = router;
