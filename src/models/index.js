const { sequelize } = require('../config/database');
const defineUser = require('./user.model');
const defineCategory = require('./category.model');
const defineTag = require('./tag.model');
const defineIcon = require('./icon.model');
const defineIconTag = require('./iconTag.model');
const defineActivityLog = require('./activityLog.model');
const defineSearchLog = require('./searchLog.model');
const defineIconDownload = require('./iconDownload.model');

const db = {};

db.sequelize = sequelize;
db.User = defineUser(sequelize);
db.Category = defineCategory(sequelize);
db.Tag = defineTag(sequelize);
db.Icon = defineIcon(sequelize);
db.IconTag = defineIconTag(sequelize);
db.ActivityLog = defineActivityLog(sequelize);
db.SearchLog = defineSearchLog(sequelize);
db.IconDownload = defineIconDownload(sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName] && db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
