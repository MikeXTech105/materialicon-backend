const { fn, col, literal } = require('sequelize');
const { Icon, IconDownload } = require('../models');
const { Op } = require('../utils/query.util');

class IconDownloadRepository {
  static async create(payload) {
    return IconDownload.create(payload);
  }

  static async count(where = {}) {
    return IconDownload.count({ where });
  }

  static async countSince(date) {
    return IconDownload.count({
      where: {
        created_at: {
          [Op.gte]: date
        }
      }
    });
  }

  static async getTopDownloadedIcons(limit = 10) {
    return IconDownload.findAll({
      attributes: [
        'icon_id',
        [fn('COUNT', col('IconDownload.id')), 'downloads_count']
      ],
      include: [
        {
          model: Icon,
          as: 'icon',
          attributes: ['id', 'name', 'slug', 'file_path', 'cdn_url', 'style', 'status']
        }
      ],
      group: ['icon_id', 'icon.id'],
      order: [[literal('downloads_count'), 'DESC']],
      limit
    });
  }
}

module.exports = IconDownloadRepository;
