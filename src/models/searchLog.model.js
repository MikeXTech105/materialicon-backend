const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SearchLog = sequelize.define('SearchLog', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    keyword: {
      type: DataTypes.STRING(180),
      allowNull: false
    },
    results_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
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
    tableName: 'search_logs',
    underscored: true,
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at'
  });

  return SearchLog;
};
