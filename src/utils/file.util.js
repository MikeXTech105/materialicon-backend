const path = require('path');
const fs = require('fs/promises');

const ensureDirectory = async (directoryPath) => {
  await fs.mkdir(directoryPath, { recursive: true });
};

const sanitizeFileName = (fileName) => {
  const extension = path.extname(fileName).toLowerCase();
  const baseName = path.basename(fileName, extension)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `${baseName || 'icon'}${extension}`;
};

const removeFileIfExists = async (absolutePath) => {
  try {
    await fs.unlink(absolutePath);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
};

module.exports = {
  ensureDirectory,
  sanitizeFileName,
  removeFileIfExists
};
