const path = require('path');
const fs = require('fs/promises');

const { sequelize } = require('../config/database');
const httpStatus = require('../constants/httpStatus.constants');
const messages = require('../constants/message.constants');
const ApiError = require('../utils/apiError');
const { getPagingMeta } = require('../utils/pagination.util');
const { buildUniqueSlug, slugify } = require('../utils/slug.util');
const { ensureDirectory, removeFileIfExists, sanitizeFileName } = require('../utils/file.util');
const { extractSvgDimensions, sanitizeSvg } = require('../utils/svg.util');
const IconRepository = require('../repositories/icon.repository');
const CategoryRepository = require('../repositories/category.repository');
const TagRepository = require('../repositories/tag.repository');
const { serializeIcon } = require('../helpers/icon.helper');
const ActivityLogService = require('./activityLog.service');

const storageRoot = path.join(__dirname, '..', '..', 'storage', 'icons');

const buildIconActivitySnapshot = (icon) => {
  const snapshot = typeof icon.toJSON === 'function' ? icon.toJSON() : { ...icon };
  delete snapshot.svg_content;
  return snapshot;
};

const normalizeTagIds = (tagIds) => {
  if (!tagIds) return [];

  if (Array.isArray(tagIds)) {
    return tagIds.map(Number).filter(Boolean);
  }

  if (typeof tagIds === 'string') {
    try {
      const parsed = JSON.parse(tagIds);
      if (Array.isArray(parsed)) return parsed.map(Number).filter(Boolean);
    } catch {
      return tagIds.split(',').map(Number).filter(Boolean);
    }
  }

  return [];
};

const buildStoragePayload = async ({ file, slug }) => {
  if (!file) {
    throw new ApiError(httpStatus.BAD_REQUEST, messages.ICON.FILE_REQUIRED);
  }

  const rawSvgContent = file.buffer.toString('utf8');
  const sanitizedSvgContent = sanitizeSvg(rawSvgContent);
  const dimensions = extractSvgDimensions(sanitizedSvgContent);
  const safeOriginalFileName = sanitizeFileName(file.originalname);
  const fileName = `${slug}.svg`;
  const iconDirectory = path.join(storageRoot, slug);
  const absolutePath = path.join(iconDirectory, fileName);
  const relativePath = `/storage/icons/${slug}/${fileName}`;

  await ensureDirectory(iconDirectory);
  await fs.writeFile(absolutePath, sanitizedSvgContent, 'utf8');

  return {
    file_name: fileName,
    original_file_name: safeOriginalFileName,
    file_path: relativePath,
    svg_content: sanitizedSvgContent,
    width: dimensions.width,
    height: dimensions.height,
    file_size: Buffer.byteLength(sanitizedSvgContent),
    mime_type: file.mimetype || 'image/svg+xml',
    absolutePath
  };
};

class IconService {
  static async listIcons(query, req = null) {
    const result = await IconRepository.findAndCountAll(query);

    return {
      icons: result.rows.map((icon) => serializeIcon(icon, req)),
      meta: getPagingMeta({
        page: result.page,
        limit: result.limit,
        total: result.count
      })
    };
  }

  static async getIconById(id, req = null) {
    const icon = await IconRepository.findById(id);

    if (!icon) {
      throw new ApiError(httpStatus.NOT_FOUND, messages.ICON.NOT_FOUND);
    }

    return serializeIcon(icon, req);
  }

  static async createIcon(payload, file, actor = null, req = null, context = {}) {
    if (payload.category_id && !await CategoryRepository.findById(payload.category_id)) {
      throw new ApiError(httpStatus.NOT_FOUND, messages.CATEGORY.NOT_FOUND);
    }

    const tagIds = normalizeTagIds(payload.tag_ids);
    const tags = tagIds.length ? await TagRepository.findByIds(tagIds) : [];

    if (tagIds.length !== tags.length) {
      throw new ApiError(httpStatus.NOT_FOUND, messages.TAG.NOT_FOUND);
    }

    const slug = payload.slug
      ? slugify(payload.slug)
      : await buildUniqueSlug(payload.name, (candidate) => IconRepository.findBySlug(candidate));

    if (await IconRepository.findBySlug(slug)) {
      throw new ApiError(httpStatus.CONFLICT, messages.ICON.SLUG_EXISTS);
    }

    const storagePayload = await buildStoragePayload({ file, slug });

    const createdIcon = await sequelize.transaction(async (transaction) => {
      const icon = await IconRepository.create({
        name: payload.name,
        slug,
        description: payload.description || null,
        category_id: payload.category_id || null,
        style: payload.style,
        cdn_url: payload.cdn_url || null,
        status: payload.status,
        created_by: actor?.id || null,
        updated_by: actor?.id || null,
        ...storagePayload
      }, { transaction });

      if (tagIds.length) {
        await IconRepository.setTags(icon, tagIds, { transaction });
      }

      return IconRepository.findById(icon.id, { transaction });
    });

    const serializedIcon = serializeIcon(createdIcon, req);

    await ActivityLogService.record({
      userId: actor?.id || null,
      module: 'icons',
      action: 'created',
      entityId: createdIcon.id,
      entityType: 'icon',
      newValues: buildIconActivitySnapshot(createdIcon),
      ...context
    });

    return serializedIcon;
  }

  static async updateIcon(id, payload, file, actor = null, req = null, context = {}) {
    const icon = await IconRepository.findById(id);

    if (!icon) {
      throw new ApiError(httpStatus.NOT_FOUND, messages.ICON.NOT_FOUND);
    }

    if (payload.category_id && !await CategoryRepository.findById(payload.category_id)) {
      throw new ApiError(httpStatus.NOT_FOUND, messages.CATEGORY.NOT_FOUND);
    }

    const tagIds = payload.tag_ids === undefined ? null : normalizeTagIds(payload.tag_ids);

    if (tagIds && tagIds.length) {
      const tags = await TagRepository.findByIds(tagIds);

      if (tagIds.length !== tags.length) {
        throw new ApiError(httpStatus.NOT_FOUND, messages.TAG.NOT_FOUND);
      }
    }

    const oldValues = buildIconActivitySnapshot(icon);
    const nextSlug = payload.slug
      ? slugify(payload.slug)
      : payload.name && payload.name !== icon.name
        ? await buildUniqueSlug(
          payload.name,
          (candidate, ignoredId) => IconRepository.findBySlug(candidate, ignoredId),
          id
        )
        : icon.slug;

    if (nextSlug !== icon.slug && await IconRepository.findBySlug(nextSlug, id)) {
      throw new ApiError(httpStatus.CONFLICT, messages.ICON.SLUG_EXISTS);
    }

    const oldAbsolutePath = path.join(__dirname, '..', '..', icon.file_path.replace(/^\//, ''));
    const storagePayload = file
      ? await buildStoragePayload({ file, slug: nextSlug })
      : {};

    const updatedIcon = await sequelize.transaction(async (transaction) => {
      await IconRepository.update(icon, {
        name: payload.name ?? icon.name,
        slug: nextSlug,
        description: payload.description ?? icon.description,
        category_id: payload.category_id ?? icon.category_id,
        style: payload.style ?? icon.style,
        cdn_url: payload.cdn_url ?? icon.cdn_url,
        status: payload.status ?? icon.status,
        updated_by: actor?.id || null,
        version: file ? icon.version + 1 : icon.version,
        ...storagePayload
      }, { transaction });

      if (tagIds) {
        await IconRepository.setTags(icon, tagIds, { transaction });
      }

      return IconRepository.findById(id, { transaction });
    });

    if (file && oldAbsolutePath !== storagePayload.absolutePath) {
      await removeFileIfExists(oldAbsolutePath);
    }

    const serializedIcon = serializeIcon(updatedIcon, req);

    await ActivityLogService.record({
      userId: actor?.id || null,
      module: 'icons',
      action: 'updated',
      entityId: icon.id,
      entityType: 'icon',
      oldValues,
      newValues: buildIconActivitySnapshot(updatedIcon),
      ...context
    });

    return serializedIcon;
  }

  static async deleteIcon(id, actor = null, context = {}) {
    const icon = await IconRepository.findById(id);

    if (!icon) {
      throw new ApiError(httpStatus.NOT_FOUND, messages.ICON.NOT_FOUND);
    }

    const oldValues = buildIconActivitySnapshot(icon);

    await IconRepository.delete(icon);

    await ActivityLogService.record({
      userId: actor?.id || null,
      module: 'icons',
      action: 'deleted',
      entityId: icon.id,
      entityType: 'icon',
      oldValues,
      ...context
    });

    return true;
  }
}

module.exports = IconService;
