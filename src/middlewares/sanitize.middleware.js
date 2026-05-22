const sanitizePayload = (value) => {
  if (Array.isArray(value)) {
    return value.map(sanitizePayload);
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).reduce((accumulator, [key, nestedValue]) => {
      if (key.includes('$') || key.includes('.')) return accumulator;
      accumulator[key] = sanitizePayload(nestedValue);
      return accumulator;
    }, {});
  }

  if (typeof value === 'string') {
    return value.trim();
  }

  return value;
};

const sanitizeRequest = (req, _res, next) => {
  req.body = sanitizePayload(req.body);
  req.query = sanitizePayload(req.query);
  req.params = sanitizePayload(req.params);
  next();
};

module.exports = sanitizeRequest;
