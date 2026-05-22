const { Category, Icon, Tag } = require('../models');
const { ICON_SORT_FIELDS } = require('../constants/icon.constants');
const { getPagination } = require('../utils/pagination.util');
const { buildSearchWhere, normalizeSort, Op } = require('../utils/query.util');

const defaultInclude = [
  {
    model: Category,
    as: 'category',
    attributes: ['id', 'name', 'slug', 'status']
  },
  {
    model: Tag,
    as: 'tags',
    attributes: ['id', 'name', 'slug'],
    through: {
      attributes: []
    }
  }
];

class IconRepository {
  static async create(payload, options = {}) {
    return Icon.create(payload, options);
  }

  static async findById(id, options = {}) {
    return Icon.findByPk(id, {
      include: defaultInclude,
      ...options
    });
  }

  static async findBySlug(slug, ignoredId = null) {
    const where = { slug };

    if (ignoredId) {
      where.id = { [Op.ne]: ignoredId };
    }

    return Icon.findOne({ where });
  }

  static async findPublishedBySlug(slug) {
    return Icon.findOne({
      where: {
        slug,
        status: 'published'
      },
      include: defaultInclude
    });
  }

  static async findAndCountAll(query) {
    const { page, limit, offset } = getPagination(query);
    const where = {};

    if (query.category_id) where.category_id = query.category_id;
    if (query.style) where.style = query.style;
    if (query.status) where.status = query.status;

    const searchWhere = buildSearchWhere(query.search, ['name', 'slug', 'description']);
    const combinedWhere = query.search
      ? { [Op.and]: [where, searchWhere] }
      : where;

    const result = await Icon.findAndCountAll({
      where: combinedWhere,
      include: defaultInclude,
      limit,
      offset,
      order: normalizeSort(query.sortBy, query.sortOrder, ICON_SORT_FIELDS),
      distinct: true
    });

    return {
      rows: result.rows,
      count: result.count,
      page,
      limit
    };
  }

  static async findPublicAndCountAll(query) {
    const { page, limit, offset } = getPagination(query);
    const where = { status: 'published' };

    if (query.category_id) where.category_id = query.category_id;
    if (query.style) where.style = query.style;

    const searchWhere = buildSearchWhere(query.search, ['name', 'slug', 'description']);
    const combinedWhere = query.search
      ? { [Op.and]: [where, searchWhere] }
      : where;

    const result = await Icon.findAndCountAll({
      where: combinedWhere,
      include: defaultInclude,
      limit,
      offset,
      order: normalizeSort(query.sortBy, query.sortOrder, ICON_SORT_FIELDS),
      distinct: true
    });

    return {
      rows: result.rows,
      count: result.count,
      page,
      limit
    };
  }

  static async update(icon, payload, options = {}) {
    return icon.update(payload, options);
  }

  static async delete(icon) {
    return icon.destroy();
  }

  static async setTags(icon, tagIds, options = {}) {
    return icon.setTags(tagIds, options);
  }
}

module.exports = IconRepository;
