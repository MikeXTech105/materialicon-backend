const { DataTypes } = require('sequelize');
const { CATEGORY_STATUS } = require('../constants/icon.constants');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(160),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM(CATEGORY_STATUS.ACTIVE, CATEGORY_STATUS.INACTIVE),
      allowNull: false,
      defaultValue: CATEGORY_STATUS.ACTIVE
    }
  }, {
    tableName: 'categories',
    underscored: true,
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });

  Category.associate = (models) => {
    Category.hasMany(models.Icon, {
      foreignKey: 'category_id',
      as: 'icons'
    });
  };

  return Category;
};
