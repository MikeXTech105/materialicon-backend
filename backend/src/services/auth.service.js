const httpStatus = require('../constants/httpStatus.constants');
const messages = require('../constants/message.constants');
const { USER_STATUS } = require('../constants/user.constants');
const ApiError = require('../utils/apiError');
const { comparePassword } = require('../utils/password.util');
const { generateToken } = require('../utils/jwt.util');
const UserRepository = require('../repositories/user.repository');
const { sanitizeUser } = require('../helpers/user.helper');
const ActivityLogService = require('./activityLog.service');

class AuthService {
  static async login({ email, password }, context = {}) {
    const user = await UserRepository.findByEmail(email, true);

    if (!user || user.status !== USER_STATUS.ACTIVE) {
      throw new ApiError(httpStatus.UNAUTHORIZED, messages.AUTH.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(httpStatus.UNAUTHORIZED, messages.AUTH.INVALID_CREDENTIALS);
    }

    await UserRepository.update(user, { last_login: new Date() });

    const token = generateToken({
      id: user.id,
      uuid: user.uuid,
      role: user.role
    });

    await ActivityLogService.record({
      userId: user.id,
      module: 'auth',
      action: 'login',
      entityId: user.id,
      entityType: 'user',
      newValues: sanitizeUser(user),
      ...context
    });

    return {
      token,
      user: sanitizeUser(user)
    };
  }
}

module.exports = AuthService;
