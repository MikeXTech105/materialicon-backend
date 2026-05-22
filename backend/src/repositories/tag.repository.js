const { Tag } = require('../models');
const { Op } = require('../utils/query.util');

class TagRepository {
  static async create(payload) {
    return Tag.create(payload);
  }

  static async findAll() {
    return Tag.findAll({
      order: [['name', 'ASC']]
    });
  }

  static async findById(id) {
    return Tag.findByPk(id);
  }

  static async findByIds(ids) {
    return Tag.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }

  static async findBySlug(slug, ignoredId = null) {
    const where = { slug };

    if (ignoredId) {
      where.id = { [Op.ne]: ignoredId };
    }

    return Tag.findOne({ where });
  }

  static async findByName(name, ignoredId = null) {
    const where = { name };

    if (ignoredId) {
      where.id = { [Op.ne]: ignoredId };
    }

    return Tag.findOne({ where });
  }
}

module.exports = TagRepository;
