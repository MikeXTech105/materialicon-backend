const slugify = (value) => String(value || '')
  .toLowerCase()
  .trim()
  .replace(/['"]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const buildUniqueSlug = async (baseValue, existsCallback, ignoredId = null) => {
  const baseSlug = slugify(baseValue) || `item-${Date.now()}`;
  let slug = baseSlug;
  let suffix = 1;

  while (await existsCallback(slug, ignoredId)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
};

module.exports = {
  slugify,
  buildUniqueSlug
};
