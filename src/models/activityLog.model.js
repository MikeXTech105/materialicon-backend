const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ActivityLog = sequelize.define('ActivityLog', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    module: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    action: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    entity_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    entity_type: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    old_values: {
      type: DataTypes.JSON,
      allowNull: true
    },
    new_values: {
      type: DataTypes.JSON,
      allowNull: true
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
    tableName: 'activity_logs',
    underscored: true,
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at'
  });

  ActivityLog.associate = (models) => {
    ActivityLog.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return ActivityLog;
};
