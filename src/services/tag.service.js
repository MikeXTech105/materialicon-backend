const httpStatus = require('../constants/httpStatus.constants');
const messages = require('../constants/message.constants');
const ApiError = require('../utils/apiError');
const { buildUniqueSlug, slugify } = require('../utils/slug.util');
const TagRepository = require('../repositories/tag.repository');
const ActivityLogService = require('./activityLog.service');

class TagService {
  static async listTags() {
    return TagRepository.findAll();
  }

  static async createTag(payload, actor = null, context = {}) {
    const duplicateName = await TagRepository.findByName(payload.name);

    if (duplicateName) {
      throw new ApiError(httpStatus.CONFLICT, messages.TAG.NAME_EXISTS);
    }

    const slug = payload.slug
      ? slugify(payload.slug)
      : await buildUniqueSlug(payload.name, (candidate) => TagRepository.findBySlug(candidate));

    if (await TagRepository.findBySlug(slug)) {
      throw new ApiError(httpStatus.CONFLICT, messages.TAG.SLUG_EXISTS);
    }

    const tag = await TagRepository.create({
      ...payload,
      slug
    });

    await ActivityLogService.record({
      userId: actor?.id || null,
      module: 'tags',
      action: 'created',
      entityId: tag.id,
      entityType: 'tag',
      newValues: tag.toJSON(),
      ...context
    });

    return tag;
  }
}

module.exports = TagService;
