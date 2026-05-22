const env = require('./env.config');

const parseOrigins = (origin) => {
  if (!origin || origin === '*') return '*';
  return origin.split(',').map((value) => value.trim());
};

module.exports = {
  origin: parseOrigins(env.cors.origin),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
