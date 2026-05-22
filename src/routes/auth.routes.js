const express = require('express');
const AuthController = require('../controllers/auth.controller');
const { loginValidation } = require('../validations/auth.validation');
const validate = require('../middlewares/validation.middleware');

const router = express.Router();

router.post('/login', loginValidation, validate, AuthController.login);

module.exports = router;
