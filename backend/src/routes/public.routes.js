const express = require('express');
const PublicController = require('../controllers/public.controller');
const validate = require('../middlewares/validation.middleware');
const {
  publicIconListValidation,
  slugParamValidation,
  trackSearchValidation
} = require('../validations/public.validation');

const router = express.Router();

router.get('/icons', publicIconListValidation, validate, PublicController.listIcons);
router.get('/icons/:slug', slugParamValidation, validate, PublicController.getIconBySlug);
router.get('/icons/:slug/download', slugParamValidation, validate, PublicController.downloadIcon);
router.get('/categories', PublicController.listCategories);
router.get('/tags', PublicController.listTags);
router.post('/search/track', trackSearchValidation, validate, PublicController.trackSearch);

module.exports = router;
