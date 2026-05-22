'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activity_logs', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      module: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      action: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      entity_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true
      },
      entity_type: {
        type: Sequelize.STRING(80),
        allowNull: true
      },
      old_values: {
        type: Sequelize.JSON,
        allowNull: true
      },
      new_values: {
        type: Sequelize.JSON,
        allowNull: true
      },
      ip_address: {
        type: Sequelize.STRING(80),
        allowNull: true
      },
      user_agent: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.createTable('search_logs', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      keyword: {
        type: Sequelize.STRING(180),
        allowNull: false
      },
      results_count: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      ip_address: {
        type: Sequelize.STRING(80),
        allowNull: true
      },
      user_agent: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.createTable('icon_downloads', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      icon_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'icons',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ip_address: {
        type: Sequelize.STRING(80),
        allowNull: true
      },
      user_agent: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('activity_logs', ['module', 'action'], { name: 'activity_logs_module_action_index' });
    await queryInterface.addIndex('activity_logs', ['user_id'], { name: 'activity_logs_user_id_index' });
    await queryInterface.addIndex('activity_logs', ['created_at'], { name: 'activity_logs_created_at_index' });
    await queryInterface.addIndex('search_logs', ['keyword'], { name: 'search_logs_keyword_index' });
    await queryInterface.addIndex('search_logs', ['results_count'], { name: 'search_logs_results_count_index' });
    await queryInterface.addIndex('search_logs', ['created_at'], { name: 'search_logs_created_at_index' });
    await queryInterface.addIndex('icon_downloads', ['icon_id'], { name: 'icon_downloads_icon_id_index' });
    await queryInterface.addIndex('icon_downloads', ['created_at'], { name: 'icon_downloads_created_at_index' });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('icon_downloads');
    await queryInterface.dropTable('search_logs');
    await queryInterface.dropTable('activity_logs');
  }
};
