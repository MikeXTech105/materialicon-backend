const httpStatus = require('../constants/httpStatus.constants');
const messages = require('../constants/message.constants');
const ApiError = require('../utils/apiError');
const { hashPassword } = require('../utils/password.util');
const { getPagingMeta } = require('../utils/pagination.util');
const UserRepository = require('../repositories/user.repository');
const { sanitizeUser } = require('../helpers/user.helper');
const ActivityLogService = require('./activityLog.service');

class UserService {
  static async createUser(payload, actor = null, context = {}) {
    const duplicateUser = await UserRepository.findByEmail(payload.email);

    if (duplicateUser) {
      throw new ApiError(httpStatus.CONFLICT, messages.USER.EMAIL_EXISTS);
    }

    const hashedPassword = await hashPassword(payload.password);
    const user = await UserRepository.create({
      ...payload,
      password: hashedPassword,
      created_by: actor?.id || null,
      updated_by: actor?.id || null
    });

    const sanitizedUser = sanitizeUser(user);

    await ActivityLogService.record({
      userId: actor?.id || null,
      module: 'users',
      action: 'created',
      entityId: user.id,
      entityType: 'user',
      newValues: sanitizedUser,
      ...context
    });

    return sanitizedUser;
  }

  static async listUsers(query) {
    const result = await UserRepository.findAndCountAll(query);

    return {
      users: result.rows.map(sanitizeUser),
      meta: getPagingMeta({
        page: result.page,
        limit: result.limit,
        total: result.count
      })
    };
  }

  static async getUserById(id) {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, messages.USER.NOT_FOUND);
    }

    return sanitizeUser(user);
  }

  static async updateUser(id, payload, actor = null, context = {}) {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, messages.USER.NOT_FOUND);
    }

    if (payload.email) {
      const duplicateUser = await UserRepository.findDuplicateEmail(payload.email, id);

      if (duplicateUser) {
        throw new ApiError(httpStatus.CONFLICT, messages.USER.EMAIL_EXISTS);
      }
    }

    const oldValues = sanitizeUser(user);
    const updatePayload = {
      ...payload,
      updated_by: actor?.id || null
    };

    if (payload.password) {
      updatePayload.password = await hashPassword(payload.password);
    }

    const updatedUser = await UserRepository.update(user, updatePayload);

    const sanitizedUser = sanitizeUser(updatedUser);

    await ActivityLogService.record({
      userId: actor?.id || null,
      module: 'users',
      action: 'updated',
      entityId: user.id,
      entityType: 'user',
      oldValues,
      newValues: sanitizedUser,
      ...context
    });

    return sanitizedUser;
  }

  static async deleteUser(id) {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, messages.USER.NOT_FOUND);
    }

    await UserRepository.delete(user);
    return true;
  }
}

module.exports = UserService;
