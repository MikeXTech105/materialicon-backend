'use strict';

const bcrypt = require('bcryptjs');
const { USER_ROLE, USER_STATUS } = require('../constants/user.constants');

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const password = await bcrypt.hash('Admin@123', 12);

    await queryInterface.bulkInsert('users', [
      {
        uuid: '00000000-0000-4000-8000-000000000001',
        first_name: 'System',
        last_name: 'Admin',
        email: 'admin@example.com',
        phone: null,
        password,
        profile_image: null,
        status: USER_STATUS.ACTIVE,
        role: USER_ROLE.ADMIN,
        last_login: null,
        created_by: null,
        updated_by: null,
        deleted_at: null,
        created_at: now,
        updated_at: now
      }
    ], {
      ignoreDuplicates: true
    });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { email: 'admin@example.com' });
  }
};
