const { Category } = require('../models');
const { Op } = require('../utils/query.util');

class CategoryRepository {
  static async create(payload) {
    return Category.create(payload);
  }

  static async findAll() {
    return Category.findAll({
      order: [['name', 'ASC']]
    });
  }

  static async findActiveAll() {
    return Category.findAll({
      where: { status: 'active' },
      order: [['name', 'ASC']]
    });
  }

  static async findById(id) {
    return Category.findByPk(id);
  }

  static async findBySlug(slug, ignoredId = null) {
    const where = { slug };

    if (ignoredId) {
      where.id = { [Op.ne]: ignoredId };
    }

    return Category.findOne({ where });
  }

  static async findByName(name, ignoredId = null) {
    const where = { name };

    if (ignoredId) {
      where.id = { [Op.ne]: ignoredId };
    }

    return Category.findOne({ where });
  }

  static async update(category, payload) {
    return category.update(payload);
  }

  static async delete(category) {
    return category.destroy();
  }
}

module.exports = CategoryRepository;
