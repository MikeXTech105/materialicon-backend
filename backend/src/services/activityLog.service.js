const { getPagingMeta } = require('../utils/pagination.util');
const logger = require('../utils/logger');
const ActivityLogRepository = require('../repositories/activityLog.repository');

class ActivityLogService {
  static async record(payload) {
    try {
      await ActivityLogRepository.create({
        user_id: payload.userId || null,
        module: payload.module,
        action: payload.action,
        entity_id: payload.entityId || null,
        entity_type: payload.entityType || null,
        old_values: payload.oldValues || null,
        new_values: payload.newValues || null,
        ip_address: payload.ipAddress || null,
        user_agent: payload.userAgent || null
      });
    } catch (error) {
      logger.error('Failed to write activity log', error);
    }
  }

  static async listActivity(query) {
    const result = await ActivityLogRepository.findAndCountAll(query);

    return {
      activities: result.rows,
      meta: getPagingMeta({
        page: result.page,
        limit: result.limit,
        total: result.count
      })
    };
  }
}

module.exports = ActivityLogService;
