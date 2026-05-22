const success = (res, statusCode, message, data = null, meta = undefined) => {
  const payload = {
    success: true,
    message
  };

  if (data !== null) payload.data = data;
  if (meta) payload.meta = meta;

  return res.status(statusCode).json(payload);
};

const error = (res, statusCode, message, errors = []) => res.status(statusCode).json({
  success: false,
  message,
  errors
});

module.exports = {
  success,
  error
};
