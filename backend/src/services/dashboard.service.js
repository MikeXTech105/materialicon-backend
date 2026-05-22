const { USER_STATUS } = require('../constants/user.constants');
const UserRepository = require('../repositories/user.repository');
const { sanitizeUser } = require('../helpers/user.helper');
const { serializeIcon } = require('../helpers/icon.helper');
const { formatFileSize, getSvgStorageStats } = require('../helpers/storage.helper');
const { daysAgo, monthsAgo, startOfDay, startOfMonth, startOfWeek } = require('../utils/date.util');
const { sequelize } = require('../config/database');
const DashboardRepository = require('../repositories/dashboard.repository');
const IconDownloadRepository = require('../repositories/iconDownload.repository');
const SearchLogRepository = require('../repositories/searchLog.repository');

class DashboardService {
  static async getStats() {
    const [totalUsers, activeUsers, inactiveUsers, latestUsers] = await Promise.all([
      UserRepository.count(),
      UserRepository.count({ status: USER_STATUS.ACTIVE }),
      UserRepository.count({ status: USER_STATUS.INACTIVE }),
      UserRepository.findLatest(5)
    ]);

    return {
      total_users: totalUsers,
      active_users: activeUsers,
      inactive_users: inactiveUsers,
      latest_users: latestUsers.map(sanitizeUser)
    };
  }

  static async getOverview() {
    const storageStats = await getSvgStorageStats();
    const [
      users,
      icons,
      categoriesTotal,
      tagsTotal,
      uploadsToday,
      uploadsThisWeek,
      uploadsThisMonth
    ] = await Promise.all([
      DashboardRepository.getUserCounts(),
      DashboardRepository.getIconCounts(),
      DashboardRepository.getCategoryCount(),
      DashboardRepository.getTagCount(),
      DashboardRepository.getUploadCountSince(startOfDay()),
      DashboardRepository.getUploadCountSince(startOfWeek()),
      DashboardRepository.getUploadCountSince(startOfMonth())
    ]);

    return {
      users,
      icons,
      categories: {
        total: categoriesTotal
      },
      tags: {
        total: tagsTotal
      },
      storage: {
        total_svg_files: storageStats.total_svg_files,
        total_storage_used: storageStats.total_storage_used,
        average_svg_size: storageStats.average_svg_size
      },
      uploads: {
        today: uploadsToday,
        this_week: uploadsThisWeek,
        this_month: uploadsThisMonth
      }
    };
  }

  static async getRecentIcons(query, req = null) {
    const limit = Math.min(Number(query.limit) || 10, 50);
    const icons = await DashboardRepository.getRecentIcons(limit);

    return icons.map((icon) => serializeIcon(icon, req));
  }

  static async getCharts() {
    const [iconsByStyle, iconsByCategory, uploadsDaily, uploadsMonthly] = await Promise.all([
      DashboardRepository.getIconsByStyle(),
      DashboardRepository.getIconsByCategory(),
      DashboardRepository.getDailyUploadTrends(daysAgo(30)),
      DashboardRepository.getMonthlyUploadTrends(monthsAgo(11))
    ]);

    return {
      icons_by_style: iconsByStyle,
      icons_by_category: iconsByCategory,
      uploads_daily: uploadsDaily,
      uploads_monthly: uploadsMonthly
    };
  }

  static async getStorageAnalytics() {
    const storageStats = await getSvgStorageStats();
    const sortedBySize = [...storageStats.files].sort((left, right) => right.size - left.size);
    const serializeFile = (file) => ({
      name: file.name,
      path: file.relative_path,
      size: formatFileSize(file.size),
      size_bytes: file.size,
      modified_at: file.modified_at
    });

    return {
      total_svg_count: storageStats.total_svg_files,
      total_storage_used: storageStats.total_storage_used,
      average_file_size: storageStats.average_svg_size,
      largest_files: sortedBySize.slice(0, 10).map(serializeFile),
      smallest_files: sortedBySize.reverse().slice(0, 10).map(serializeFile)
    };
  }

  static async getSearchAnalytics() {
    const [topSearchedKeywords, failedSearches, recentSearches] = await Promise.all([
      SearchLogRepository.getTopKeywords(10),
      SearchLogRepository.getFailedSearches(10),
      SearchLogRepository.getRecentSearches(10)
    ]);

    return {
      top_searched_keywords: topSearchedKeywords,
      failed_searches: failedSearches,
      recent_searches: recentSearches
    };
  }

  static async getDownloadAnalytics() {
    const [topDownloadedIcons, totalDownloads, downloadsToday, downloadsThisMonth] = await Promise.all([
      IconDownloadRepository.getTopDownloadedIcons(10),
      IconDownloadRepository.count(),
      IconDownloadRepository.countSince(startOfDay()),
      IconDownloadRepository.countSince(startOfMonth())
    ]);

    return {
      top_downloaded_icons: topDownloadedIcons,
      total_downloads: totalDownloads,
      downloads_today: downloadsToday,
      downloads_this_month: downloadsThisMonth
    };
  }

  static async getSystemHealth() {
    let database = 'connected';

    try {
      await sequelize.authenticate();
    } catch {
      database = 'disconnected';
    }

    const storageStats = await getSvgStorageStats();

    return {
      database,
      storage: 'active',
      api: 'running',
      uploads: storageStats ? 'working' : 'unavailable'
    };
  }

  static async getQuickActions() {
    return DashboardRepository.getQuickActionCounts();
  }
}

module.exports = DashboardService;
