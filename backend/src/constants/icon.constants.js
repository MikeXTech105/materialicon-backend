const ICON_STATUS = Object.freeze({
  DRAFT: 'draft',
  PUBLISHED: 'published'
});

const CATEGORY_STATUS = Object.freeze({
  ACTIVE: 'active',
  INACTIVE: 'inactive'
});

const ICON_STYLES = Object.freeze({
  OUTLINED: 'outlined',
  FILLED: 'filled',
  ROUNDED: 'rounded',
  SHARP: 'sharp',
  TWO_TONE: 'two-tone'
});

const ICON_SORT_FIELDS = Object.freeze([
  'id',
  'name',
  'slug',
  'style',
  'status',
  'file_size',
  'version',
  'created_at',
  'updated_at'
]);

module.exports = {
  ICON_STATUS,
  CATEGORY_STATUS,
  ICON_STYLES,
  ICON_SORT_FIELDS
};
