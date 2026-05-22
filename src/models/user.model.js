const { DataTypes } = require('sequelize');
const { USER_ROLE, USER_STATUS } = require('../constants/user.constants');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
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
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    profile_image: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM(USER_STATUS.ACTIVE, USER_STATUS.INACTIVE),
      allowNull: false,
      defaultValue: USER_STATUS.ACTIVE
    },
    role: {
      type: DataTypes.ENUM(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.MANAGER),
      allowNull: false,
      defaultValue: USER_ROLE.USER
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
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
    tableName: 'users',
    underscored: true,
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    defaultScope: {
      attributes: {
        exclude: ['password']
      }
    }
  });

  User.associate = () => {
    // Role and permission associations can be added here when RBAC tables are introduced.
  };

  return User;
};
