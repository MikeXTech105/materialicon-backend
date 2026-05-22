const httpStatus = require('../constants/httpStatus.constants');
const messages = require('../constants/message.constants');
const ApiError = require('../utils/apiError');
const { getPagingMeta } = require('../utils/pagination.util');
const { buildAbsoluteUrl } = require('../utils/url.util');
const { serializeIcon } = require('../helpers/icon.helper');
const CategoryRepository = require('../repositories/category.repository');
const IconDownloadRepository = require('../repositories/iconDownload.repository');
const IconRepository = require('../repositories/icon.repository');
const SearchLogRepository = require('../repositories/searchLog.repository');
const TagRepository = require('../repositories/tag.repository');

class PublicService {
  static async listIcons(query, req = null) {
    const publicQuery = { ...query };

    if (query.category && !query.category_id) {
      const category = await CategoryRepository.findBySlug(query.category);
      publicQuery.category_id = category?.id || 0;
    }

    const result = await IconRepository.findPublicAndCountAll(publicQuery);

    return {
      icons: result.rows.map((icon) => serializeIcon(icon, req)),
      meta: getPagingMeta({
        page: result.page,
        limit: result.limit,
        total: result.count
      })
    };
  }

  static async getIconBySlug(slug, req = null) {
    const icon = await IconRepository.findPublishedBySlug(slug);

    if (!icon) {
      throw new ApiError(httpStatus.NOT_FOUND, messages.ICON.NOT_FOUND);
    }

    return serializeIcon(icon, req);
  }

  static async listCategories() {
    return CategoryRepository.findActiveAll();
  }

  static async listTags() {
    return TagRepository.findAll();
  }

  static async trackSearch(payload, context) {
    await SearchLogRepository.create({
      keyword: payload.keyword,
      results_count: payload.results_count,
      ip_address: context.ipAddress,
      user_agent: context.userAgent
    });
  }

  static async trackDownloadAndResolveUrl(slug, context, req) {
    const icon = await IconRepository.findPublishedBySlug(slug);

    if (!icon) {
      throw new ApiError(httpStatus.NOT_FOUND, messages.ICON.NOT_FOUND);
    }

    await IconDownloadRepository.create({
      icon_id: icon.id,
      ip_address: context.ipAddress,
      user_agent: context.userAgent
    });

    return icon.cdn_url || buildAbsoluteUrl(req, icon.file_path);
  }
}

module.exports = PublicService;
