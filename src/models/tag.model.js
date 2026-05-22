const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Tag = sequelize.define('Tag', {
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
    }
  }, {
    tableName: 'tags',
    underscored: true,
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Icon, {
      through: models.IconTag,
      foreignKey: 'tag_id',
      otherKey: 'icon_id',
      as: 'icons'
    });
  };

  return Tag;
};
