const { User } = require('../models');
const { USER_SORT_FIELDS } = require('../constants/user.constants');
const { getPagination } = require('../utils/pagination.util');
const { buildSearchWhere, normalizeSort, Op } = require('../utils/query.util');

class UserRepository {
  static async create(payload) {
    return User.create(payload);
  }

  static async findById(id) {
    return User.findByPk(id);
  }

  static async findByEmail(email, includePassword = false) {
    const model = includePassword ? User.unscoped() : User;
    return model.findOne({ where: { email } });
  }

  static async findDuplicateEmail(email, ignoredUserId = null) {
    const where = { email };

    if (ignoredUserId) {
      where.id = { [Op.ne]: ignoredUserId };
    }

    return User.findOne({ where });
  }

  static async findAndCountAll(query) {
    const { page, limit, offset } = getPagination(query);
    const where = {};

    if (query.status) where.status = query.status;
    if (query.role) where.role = query.role;

    const searchWhere = buildSearchWhere(query.search, ['first_name', 'last_name', 'email', 'phone']);
    const combinedWhere = query.search
      ? { [Op.and]: [where, searchWhere] }
      : where;

    const result = await User.findAndCountAll({
      where: combinedWhere,
      limit,
      offset,
      order: normalizeSort(query.sortBy, query.sortOrder, USER_SORT_FIELDS),
      distinct: true
    });

    return {
      rows: result.rows,
      count: result.count,
      page,
      limit
    };
  }

  static async update(user, payload) {
    return user.update(payload);
  }

  static async delete(user) {
    return user.destroy();
  }

  static async count(where = {}) {
    return User.count({ where });
  }

  static async findLatest(limit = 5) {
    return User.findAll({
      limit,
      order: [['created_at', 'DESC']]
    });
  }
}

module.exports = UserRepository;
