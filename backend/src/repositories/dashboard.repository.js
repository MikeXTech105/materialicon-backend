const { fn, col, literal } = require('sequelize');
const { Category, Icon, Tag, User } = require('../models');
const { ICON_STATUS } = require('../constants/icon.constants');
const { USER_STATUS } = require('../constants/user.constants');
const { Op } = require('../utils/query.util');

class DashboardRepository {
  static async getUserCounts() {
    const [total, active, inactive] = await Promise.all([
      User.count(),
      User.count({ where: { status: USER_STATUS.ACTIVE } }),
      User.count({ where: { status: USER_STATUS.INACTIVE } })
    ]);

    return { total, active, inactive };
  }

  static async getIconCounts() {
    const [total, published, draft, deleted] = await Promise.all([
      Icon.count(),
      Icon.count({ where: { status: ICON_STATUS.PUBLISHED } }),
      Icon.count({ where: { status: ICON_STATUS.DRAFT } }),
      Icon.count({
        paranoid: false,
        where: {
          deleted_at: {
            [Op.ne]: null
          }
        }
      })
    ]);

    return { total, published, draft, deleted };
  }

  static async getCategoryCount() {
    return Category.count();
  }

  static async getTagCount() {
    return Tag.count();
  }

  static async getUploadCountSince(date) {
    return Icon.count({
      where: {
        created_at: {
          [Op.gte]: date
        }
      }
    });
  }

  static async getRecentIcons(limit = 10) {
    return Icon.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug', 'status']
        }
      ],
      limit,
      order: [['created_at', 'DESC']]
    });
  }

  static async getIconsByStyle() {
    return Icon.findAll({
      attributes: [
        'style',
        [fn('COUNT', col('id')), 'count']
      ],
      group: ['style'],
      order: [['style', 'ASC']],
      raw: true
    });
  }

  static async getIconsByCategory() {
    return Icon.findAll({
      attributes: [
        [col('category.id'), 'category_id'],
        [col('category.name'), 'category_name'],
        [fn('COUNT', col('Icon.id')), 'count']
      ],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: []
        }
      ],
      group: ['category.id', 'category.name'],
      order: [[literal('count'), 'DESC']],
      raw: true
    });
  }

  static async getDailyUploadTrends(sinceDate) {
    return Icon.findAll({
      attributes: [
        [fn('DATE', col('created_at')), 'date'],
        [fn('COUNT', col('id')), 'count']
      ],
      where: {
        created_at: {
          [Op.gte]: sinceDate
        }
      },
      group: [fn('DATE', col('created_at'))],
      order: [[literal('date'), 'ASC']],
      raw: true
    });
  }

  static async getMonthlyUploadTrends(sinceDate) {
    return Icon.findAll({
      attributes: [
        [fn('DATE_FORMAT', col('created_at'), '%Y-%m'), 'month'],
        [fn('COUNT', col('id')), 'count']
      ],
      where: {
        created_at: {
          [Op.gte]: sinceDate
        }
      },
      group: [fn('DATE_FORMAT', col('created_at'), '%Y-%m')],
      order: [[literal('month'), 'ASC']],
      raw: true
    });
  }

  static async getQuickActionCounts() {
    const [
      draftIcons,
      iconsWithoutCategory,
      iconsMissingCdnUrl,
      iconsMissingTags,
      emptyCategories
    ] = await Promise.all([
      Icon.count({ where: { status: ICON_STATUS.DRAFT } }),
      Icon.count({ where: { category_id: null } }),
      Icon.count({
        where: {
          [Op.or]: [{ cdn_url: null }, { cdn_url: '' }]
        }
      }),
      Icon.count({
        include: [
          {
            model: Tag,
            as: 'tags',
            required: false,
            attributes: [],
            through: { attributes: [] }
          }
        ],
        where: literal('`tags`.`id` IS NULL')
      }),
      Category.count({
        include: [
          {
            model: Icon,
            as: 'icons',
            required: false,
            attributes: []
          }
        ],
        where: literal('`icons`.`id` IS NULL')
      })
    ]);

    return {
      draft_icon_count: draftIcons,
      icons_without_category: iconsWithoutCategory,
      icons_missing_tags: iconsMissingTags,
      icons_missing_cdn_url: iconsMissingCdnUrl,
      empty_categories: emptyCategories
    };
  }
}

module.exports = DashboardRepository;
