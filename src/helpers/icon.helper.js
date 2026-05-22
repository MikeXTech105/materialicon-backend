const { buildAbsoluteUrl } = require('../utils/url.util');

const serializeIcon = (icon, req = null) => {
  if (!icon) return null;

  const plainIcon = typeof icon.toJSON === 'function' ? icon.toJSON() : { ...icon };
  plainIcon.preview_url = plainIcon.cdn_url || (req ? buildAbsoluteUrl(req, plainIcon.file_path) : plainIcon.file_path);

  return plainIcon;
};

module.exports = {
  serializeIcon
};
