const USER_STATUS = Object.freeze({
  ACTIVE: 'active',
  INACTIVE: 'inactive'
});

const USER_ROLE = Object.freeze({
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager'
});

const USER_SORT_FIELDS = Object.freeze([
  'id',
  'first_name',
  'last_name',
  'email',
  'phone',
  'status',
  'role',
  'created_at',
  'updated_at',
  'last_login'
]);

module.exports = {
  USER_STATUS,
  USER_ROLE,
  USER_SORT_FIELDS
};
