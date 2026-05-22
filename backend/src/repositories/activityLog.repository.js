const { ActivityLog, User } = require('../models');
const { getPagination } = require('../utils/pagination.util');

class ActivityLogRepository {
  static async create(payload) {
    return ActivityLog.create(payload);
  }

  static async findAndCountAll(query) {
    const { page, limit, offset } = getPagination(query);
    const where = {};

    if (query.module) where.module = query.module;
    if (query.action) where.action = query.action;

    const result = await ActivityLog.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'first_name', 'last_name', 'email', 'role']
        }
      ],
      limit,
      offset,
      order: [['created_at', 'DESC']]
    });

    return {
      rows: result.rows,
      count: result.count,
      page,
      limit
    };
  }
}

module.exports = ActivityLogRepository;
