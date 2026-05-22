'use strict';

const { CATEGORY_STATUS, ICON_STATUS, ICON_STYLES } = require('../constants/icon.constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING(160),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM(CATEGORY_STATUS.ACTIVE, CATEGORY_STATUS.INACTIVE),
        allowNull: false,
        defaultValue: CATEGORY_STATUS.ACTIVE
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

    await queryInterface.createTable('tags', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING(160),
        allowNull: false
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

    await queryInterface.createTable('icons', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING(180),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      category_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: 'categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      style: {
        type: Sequelize.ENUM(...Object.values(ICON_STYLES)),
        allowNull: false,
        defaultValue: ICON_STYLES.OUTLINED
      },
      file_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      original_file_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      file_path: {
        type: Sequelize.STRING(600),
        allowNull: false
      },
      cdn_url: {
        type: Sequelize.STRING(600),
        allowNull: true
      },
      svg_content: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      width: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
      },
      height: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
      },
      file_size: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      mime_type: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      version: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1
      },
      status: {
        type: Sequelize.ENUM(ICON_STATUS.DRAFT, ICON_STATUS.PUBLISHED),
        allowNull: false,
        defaultValue: ICON_STATUS.DRAFT
      },
      created_by: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      updated_by: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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

    await queryInterface.createTable('icon_tags', {
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
      tag_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'tags',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

    await queryInterface.addIndex('categories', ['slug'], { unique: true, name: 'categories_slug_unique' });
    await queryInterface.addIndex('categories', ['status'], { name: 'categories_status_index' });
    await queryInterface.addIndex('tags', ['slug'], { unique: true, name: 'tags_slug_unique' });
    await queryInterface.addIndex('icons', ['uuid'], { unique: true, name: 'icons_uuid_unique' });
    await queryInterface.addIndex('icons', ['slug'], { unique: true, name: 'icons_slug_unique' });
    await queryInterface.addIndex('icons', ['category_id'], { name: 'icons_category_id_index' });
    await queryInterface.addIndex('icons', ['style'], { name: 'icons_style_index' });
    await queryInterface.addIndex('icons', ['status'], { name: 'icons_status_index' });
    await queryInterface.addIndex('icon_tags', ['icon_id', 'tag_id'], {
      unique: true,
      name: 'icon_tags_icon_id_tag_id_unique'
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('icon_tags');
    await queryInterface.dropTable('icons');
    await queryInterface.dropTable('tags');
    await queryInterface.dropTable('categories');
  }
};
