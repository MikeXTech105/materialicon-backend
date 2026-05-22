const express = require('express');
const UserController = require('../controllers/user.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const {
  createUserValidation,
  idParamValidation,
  listUsersValidation,
  updateUserValidation
} = require('../validations/user.validation');

const router = express.Router();

router
  .route('/')
  .post(authenticate, createUserValidation, validate, UserController.createUser)
  .get(authenticate, listUsersValidation, validate, UserController.listUsers);

router
  .route('/:id')
  .get(authenticate, idParamValidation, validate, UserController.getUserById)
  .put(authenticate, updateUserValidation, validate, UserController.updateUser)
  .delete(authenticate, idParamValidation, validate, UserController.deleteUser);

module.exports = router;
