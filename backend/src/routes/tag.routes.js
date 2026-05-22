const express = require('express');
const TagController = require('../controllers/tag.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const { createTagValidation } = require('../validations/tag.validation');

const router = express.Router();

router
  .route('/')
  .get(authenticate, TagController.listTags)
  .post(authenticate, createTagValidation, validate, TagController.createTag);

module.exports = router;
