const { Op } = require('sequelize');

const normalizeSort = (sortBy, sortOrder, allowedFields, defaultSort = 'created_at') => {
  const field = allowedFields.includes(sortBy) ? sortBy : defaultSort;
  const direction = String(sortOrder || 'DESC').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  return [[field, direction]];
};

const buildSearchWhere = (search, fields) => {
  if (!search) return {};

  return {
    [Op.or]: fields.map((field) => ({
      [field]: {
        [Op.like]: `%${search}%`
      }
    }))
  };
};

module.exports = {
  normalizeSort,
  buildSearchWhere,
  Op
};
