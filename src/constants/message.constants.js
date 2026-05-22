module.exports = {
  AUTH: {
    LOGIN_SUCCESS: 'Login successful',
    INVALID_CREDENTIALS: 'Invalid email or password',
    TOKEN_MISSING: 'Authorization token is required',
    TOKEN_INVALID: 'Invalid or expired token'
  },
  USER: {
    CREATED: 'User created successfully',
    FETCHED: 'User fetched successfully',
    LIST_FETCHED: 'Users fetched successfully',
    UPDATED: 'User updated successfully',
    DELETED: 'User deleted successfully',
    NOT_FOUND: 'User not found',
    EMAIL_EXISTS: 'Email address already exists'
  },
  DASHBOARD: {
    STATS_FETCHED: 'Dashboard stats fetched successfully',
    OVERVIEW_FETCHED: 'Dashboard overview fetched successfully',
    RECENT_ICONS_FETCHED: 'Recent icons fetched successfully',
    CHARTS_FETCHED: 'Dashboard charts fetched successfully',
    ACTIVITY_FETCHED: 'Activity logs fetched successfully',
    STORAGE_FETCHED: 'Storage analytics fetched successfully',
    SEARCH_ANALYTICS_FETCHED: 'Search analytics fetched successfully',
    DOWNLOAD_ANALYTICS_FETCHED: 'Download analytics fetched successfully',
    SYSTEM_HEALTH_FETCHED: 'System health fetched successfully',
    QUICK_ACTIONS_FETCHED: 'Dashboard quick actions fetched successfully'
  },
  PUBLIC: {
    SEARCH_TRACKED: 'Search tracked successfully',
    ICONS_FETCHED: 'Icons fetched successfully',
    ICON_FETCHED: 'Icon fetched successfully',
    CATEGORIES_FETCHED: 'Categories fetched successfully',
    TAGS_FETCHED: 'Tags fetched successfully',
    DOWNLOAD_TRACKED: 'Download tracked successfully'
  },
  CATEGORY: {
    CREATED: 'Category created successfully',
    LIST_FETCHED: 'Categories fetched successfully',
    UPDATED: 'Category updated successfully',
    DELETED: 'Category deleted successfully',
    NOT_FOUND: 'Category not found',
    SLUG_EXISTS: 'Category slug already exists',
    NAME_EXISTS: 'Category name already exists'
  },
  TAG: {
    CREATED: 'Tag created successfully',
    LIST_FETCHED: 'Tags fetched successfully',
    NOT_FOUND: 'Tag not found',
    SLUG_EXISTS: 'Tag slug already exists',
    NAME_EXISTS: 'Tag name already exists'
  },
  ICON: {
    CREATED: 'Icon created successfully',
    LIST_FETCHED: 'Icons fetched successfully',
    FETCHED: 'Icon fetched successfully',
    UPDATED: 'Icon updated successfully',
    DELETED: 'Icon deleted successfully',
    NOT_FOUND: 'Icon not found',
    SLUG_EXISTS: 'Icon slug already exists',
    FILE_REQUIRED: 'SVG icon file is required',
    INVALID_FILE: 'Only SVG files are supported'
  },
  COMMON: {
    VALIDATION_FAILED: 'Validation failed',
    ROUTE_NOT_FOUND: 'Route not found',
    INTERNAL_ERROR: 'Internal server error'
  }
};
