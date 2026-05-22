'use strict';

const { USER_ROLE, USER_STATUS } = require('../constants/user.constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    const tables = await queryInterface.showAllTables();
    const normalizedTables = tables.map((table) => (typeof table === 'string' ? table : table.tableName));
    const usersTableExists = normalizedTables.includes('users');

    if (!usersTableExists) {
      await queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },
      phone: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      profile_image: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM(USER_STATUS.ACTIVE, USER_STATUS.INACTIVE),
        allowNull: false,
        defaultValue: USER_STATUS.ACTIVE
      },
      role: {
        type: Sequelize.ENUM(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.MANAGER),
        allowNull: false,
        defaultValue: USER_ROLE.USER
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_by: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true
      },
      updated_by: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
      });
    } else {
      const tableDefinition = await queryInterface.describeTable('users');
      const addColumnIfMissing = async (columnName, definition) => {
        if (!tableDefinition[columnName]) {
          await queryInterface.addColumn('users', columnName, definition);
        }
      };

      await addColumnIfMissing('uuid', {
        type: Sequelize.UUID,
        allowNull: true
      });
      await addColumnIfMissing('first_name', {
        type: Sequelize.STRING(100),
        allowNull: true
      });
      await addColumnIfMissing('last_name', {
        type: Sequelize.STRING(100),
        allowNull: true
      });
      await addColumnIfMissing('phone', {
        type: Sequelize.STRING(30),
        allowNull: true
      });
      await addColumnIfMissing('profile_image', {
        type: Sequelize.STRING(500),
        allowNull: true
      });
      await addColumnIfMissing('status', {
        type: Sequelize.ENUM(USER_STATUS.ACTIVE, USER_STATUS.INACTIVE),
        allowNull: false,
        defaultValue: USER_STATUS.ACTIVE
      });
      await addColumnIfMissing('role', {
        type: Sequelize.ENUM(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.MANAGER),
        allowNull: false,
        defaultValue: USER_ROLE.USER
      });
      await addColumnIfMissing('last_login', {
        type: Sequelize.DATE,
        allowNull: true
      });
      await addColumnIfMissing('created_by', {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true
      });
      await addColumnIfMissing('updated_by', {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true
      });
      await addColumnIfMissing('deleted_at', {
        type: Sequelize.DATE,
        allowNull: true
      });
      await addColumnIfMissing('created_at', {
        type: Sequelize.DATE,
        allowNull: true
      });
      await addColumnIfMissing('updated_at', {
        type: Sequelize.DATE,
        allowNull: true
      });

      await queryInterface.sequelize.query(`
        UPDATE users
        SET uuid = UUID()
        WHERE uuid IS NULL
      `);

      if (tableDefinition.name && !tableDefinition.first_name) {
        await queryInterface.sequelize.query(`
          UPDATE users
          SET
            first_name = COALESCE(NULLIF(SUBSTRING_INDEX(name, ' ', 1), ''), 'User'),
            last_name = NULLIF(TRIM(SUBSTRING(name, LENGTH(SUBSTRING_INDEX(name, ' ', 1)) + 1)), '')
          WHERE first_name IS NULL
        `);
      }

      if (tableDefinition.createdAt && !tableDefinition.created_at) {
        await queryInterface.sequelize.query('UPDATE users SET created_at = createdAt WHERE created_at IS NULL');
      }

      if (tableDefinition.updatedAt && !tableDefinition.updated_at) {
        await queryInterface.sequelize.query('UPDATE users SET updated_at = updatedAt WHERE updated_at IS NULL');
      }

      await queryInterface.sequelize.query('UPDATE users SET created_at = CURRENT_TIMESTAMP WHERE created_at IS NULL');
      await queryInterface.sequelize.query('UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE updated_at IS NULL');

      await queryInterface.changeColumn('users', 'uuid', {
        type: Sequelize.UUID,
        allowNull: false
      });
      await queryInterface.changeColumn('users', 'first_name', {
        type: Sequelize.STRING(100),
        allowNull: false
      });
      await queryInterface.changeColumn('users', 'created_at', {
        type: Sequelize.DATE,
        allowNull: false
      });
      await queryInterface.changeColumn('users', 'updated_at', {
        type: Sequelize.DATE,
        allowNull: false
      });
    }

    const indexes = await queryInterface.showIndex('users');
    const indexNames = indexes.map((index) => index.name);

    if (!indexNames.includes('users_email_unique')) {
      await queryInterface.addIndex('users', ['email'], { unique: true, name: 'users_email_unique' });
    }

    if (!indexNames.includes('users_uuid_unique')) {
      await queryInterface.addIndex('users', ['uuid'], { unique: true, name: 'users_uuid_unique' });
    }

    if (!indexNames.includes('users_status_index')) {
      await queryInterface.addIndex('users', ['status'], { name: 'users_status_index' });
    }

    if (!indexNames.includes('users_role_index')) {
      await queryInterface.addIndex('users', ['role'], { name: 'users_role_index' });
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  }
};
