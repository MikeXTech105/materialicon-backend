const express = require('express');
const IconController = require('../controllers/icon.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { uploadIconSvg } = require('../middlewares/iconUpload.middleware');
const validate = require('../middlewares/validation.middleware');
const {
  createIconValidation,
  iconIdParamValidation,
  listIconsValidation,
  updateIconValidation
} = require('../validations/icon.validation');

const router = express.Router();

router
  .route('/')
  .get(authenticate, listIconsValidation, validate, IconController.listIcons)
  .post(authenticate, uploadIconSvg, createIconValidation, validate, IconController.createIcon);

router
  .route('/:id')
  .get(authenticate, iconIdParamValidation, validate, IconController.getIconById)
  .put(authenticate, uploadIconSvg, updateIconValidation, validate, IconController.updateIcon)
  .delete(authenticate, iconIdParamValidation, validate, IconController.deleteIcon);

module.exports = router;
