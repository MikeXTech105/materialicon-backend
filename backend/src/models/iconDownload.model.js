const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const IconDownload = sequelize.define('IconDownload', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    icon_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    ip_address: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    user_agent: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    tableName: 'icon_downloads',
    underscored: true,
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at'
  });

  IconDownload.associate = (models) => {
    IconDownload.belongsTo(models.Icon, {
      foreignKey: 'icon_id',
      as: 'icon'
    });
  };

  return IconDownload;
};
