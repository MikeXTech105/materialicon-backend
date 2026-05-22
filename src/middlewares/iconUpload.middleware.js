const multer = require('multer');
const httpStatus = require('../constants/httpStatus.constants');
const messages = require('../constants/message.constants');
const ApiError = require('../utils/apiError');

const SVG_MAX_FILE_SIZE = 2 * 1024 * 1024;

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: SVG_MAX_FILE_SIZE,
    files: 1
  },
  fileFilter: (_req, file, callback) => {
    const isSvgMime = file.mimetype === 'image/svg+xml';
    const isSvgExtension = file.originalname.toLowerCase().endsWith('.svg');

    if (!isSvgMime || !isSvgExtension) {
      return callback(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, messages.ICON.INVALID_FILE));
    }

    return callback(null, true);
  }
});

const uploadIconSvg = (req, res, next) => {
  upload.single('file')(req, res, (error) => {
    if (!error) return next();

    if (error instanceof multer.MulterError) {
      return next(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, error.message));
    }

    return next(error);
  });
};

module.exports = {
  uploadIconSvg
};
