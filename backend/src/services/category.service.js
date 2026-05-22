const httpStatus = require('../constants/httpStatus.constants');
const messages = require('../constants/message.constants');
const ApiError = require('../utils/apiError');
const { buildUniqueSlug, slugify } = require('../utils/slug.util');
const CategoryRepository = require('../repositories/category.repository');
const ActivityLogService = require('./activityLog.service');

class CategoryService {
  static async listCategories() {
    return CategoryRepository.findAll();
  }

  static async createCategory(payload, actor = null, context = {}) {
    const duplicateName = await CategoryRepository.findByName(payload.name);

    if (duplicateName) {
      throw new ApiError(httpStatus.CONFLICT, messages.CATEGORY.NAME_EXISTS);
    }

    const slug = payload.slug
      ? slugify(payload.slug)
      : await buildUniqueSlug(payload.name, (candidate) => CategoryRepository.findBySlug(candidate));

    if (await CategoryRepository.findBySlug(slug)) {
      throw new ApiError(httpStatus.CONFLICT, messages.CATEGORY.SLUG_EXISTS);
    }

    const category = await CategoryRepository.create({
      ...payload,
      slug
    });

    await ActivityLogService.record({
      userId: actor?.id || null,
      module: 'categories',
      action: 'created',
      entityId: category.id,
      entityType: 'category',
      newValues: category.toJSON(),
      ...context
    });

    return category;
  }

  static async updateCategory(id, payload, actor = null, context = {}) {
    const category = await CategoryRepository.findById(id);

    if (!category) {
      throw new ApiError(httpStatus.NOT_FOUND, messages.CATEGORY.NOT_FOUND);
    }

    if (payload.name && await CategoryRepository.findByName(payload.name, id)) {
      throw new ApiError(httpStatus.CONFLICT, messages.CATEGORY.NAME_EXISTS);
    }

    const updatePayload = { ...payload };

    if (payload.slug) {
      updatePayload.slug = slugify(payload.slug);
    } else if (payload.name && payload.name !== category.name) {
      updatePayload.slug = await buildUniqueSlug(
        payload.name,
        (candidate, ignoredId) => CategoryRepository.findBySlug(candidate, ignoredId),
        id
      );
    }

    if (updatePayload.slug && await CategoryRepository.findBySlug(updatePayload.slug, id)) {
      throw new ApiError(httpStatus.CONFLICT, messages.CATEGORY.SLUG_EXISTS);
    }

    const oldValues = category.toJSON();
    const updatedCategory = await CategoryRepository.update(category, updatePayload);

    await ActivityLogService.record({
      userId: actor?.id || null,
      module: 'categories',
      action: 'updated',
      entityId: category.id,
      entityType: 'category',
      oldValues,
      newValues: updatedCategory.toJSON(),
      ...context
    });

    return updatedCategory;
  }

  static async deleteCategory(id) {
    const category = await CategoryRepository.findById(id);

    if (!category) {
      throw new ApiError(httpStatus.NOT_FOUND, messages.CATEGORY.NOT_FOUND);
    }

    await CategoryRepository.delete(category);
    return true;
  }
}

module.exports = CategoryService;
