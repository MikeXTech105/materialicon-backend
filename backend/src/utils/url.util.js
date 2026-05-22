const buildAbsoluteUrl = (req, relativePath) => {
  if (!relativePath) return null;

  const normalizedPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
  return `${req.protocol}://${req.get('host')}${normalizedPath.replace(/\\/g, '/')}`;
};

module.exports = {
  buildAbsoluteUrl
};
