const { DataTypes } = require('sequelize');
const { ICON_STATUS, ICON_STYLES } = require('../constants/icon.constants');

module.exports = (sequelize) => {
  const Icon = sequelize.define('Icon', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(180),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    style: {
      type: DataTypes.ENUM(...Object.values(ICON_STYLES)),
      allowNull: false,
      defaultValue: ICON_STYLES.OUTLINED
    },
    file_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    original_file_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    file_path: {
      type: DataTypes.STRING(600),
      allowNull: false
    },
    cdn_url: {
      type: DataTypes.STRING(600),
      allowNull: true
    },
    svg_content: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    width: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    height: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    file_size: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    mime_type: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    version: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1
    },
    status: {
      type: DataTypes.ENUM(ICON_STATUS.DRAFT, ICON_STATUS.PUBLISHED),
      allowNull: false,
      defaultValue: ICON_STATUS.DRAFT
    },
    created_by: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    }
  }, {
    tableName: 'icons',
    underscored: true,
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });

  Icon.associate = (models) => {
    Icon.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category'
    });
    Icon.belongsToMany(models.Tag, {
      through: models.IconTag,
      foreignKey: 'icon_id',
      otherKey: 'tag_id',
      as: 'tags'
    });
    Icon.hasMany(models.IconDownload, {
      foreignKey: 'icon_id',
      as: 'downloads'
    });
  };

  return Icon;
};
