const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const IconTag = sequelize.define('IconTag', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    icon_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    tag_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'icon_tags',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return IconTag;
};
