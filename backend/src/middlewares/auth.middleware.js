const httpStatus = require('../constants/httpStatus.constants');
const messages = require('../constants/message.constants');
const ApiError = require('../utils/apiError');
const { verifyToken } = require('../utils/jwt.util');
const UserRepository = require('../repositories/user.repository');

const extractBearerToken = (authorizationHeader) => {
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) return null;
  return authorizationHeader.split(' ')[1];
};

const authenticate = async (req, _res, next) => {
  const token = extractBearerToken(req.headers.authorization);

  if (!token) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, messages.AUTH.TOKEN_MISSING));
  }

  try {
    const decoded = verifyToken(token);
    const user = await UserRepository.findById(decoded.id);

    if (!user) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, messages.AUTH.TOKEN_INVALID));
    }

    req.user = user;
    req.auth = decoded;
    return next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new ApiError(httpStatus.UNAUTHORIZED, messages.AUTH.TOKEN_INVALID));
    }

    return next(error);
  }
};

const authorizeRoles = (...allowedRoles) => (req, _res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return next(new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to perform this action'));
  }

  return next();
};

module.exports = {
  authenticate,
  authorizeRoles
};
