const { fn, col, literal } = require('sequelize');
const { SearchLog } = require('../models');

class SearchLogRepository {
  static async create(payload) {
    return SearchLog.create(payload);
  }

  static async getTopKeywords(limit = 10) {
    return SearchLog.findAll({
      attributes: [
        'keyword',
        [fn('COUNT', col('id')), 'search_count'],
        [fn('SUM', col('results_count')), 'total_results']
      ],
      group: ['keyword'],
      order: [[literal('search_count'), 'DESC']],
      limit,
      raw: true
    });
  }

  static async getFailedSearches(limit = 10) {
    return SearchLog.findAll({
      where: {
        results_count: 0
      },
      attributes: [
        'keyword',
        [fn('COUNT', col('id')), 'search_count']
      ],
      group: ['keyword'],
      order: [[literal('search_count'), 'DESC']],
      limit,
      raw: true
    });
  }

  static async getRecentSearches(limit = 10) {
    return SearchLog.findAll({
      limit,
      order: [['created_at', 'DESC']]
    });
  }
}

module.exports = SearchLogRepository;
