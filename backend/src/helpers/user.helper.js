const sanitizeUser = (user) => {
  if (!user) return null;

  const plainUser = typeof user.toJSON === 'function' ? user.toJSON() : { ...user };
  delete plainUser.password;

  return plainUser;
};

module.exports = {
  sanitizeUser
};
