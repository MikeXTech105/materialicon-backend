const path = require('path');
const fs = require('fs/promises');

const storageIconsRoot = path.join(__dirname, '..', '..', 'storage', 'icons');

const formatFileSize = (bytes = 0) => {
  if (!bytes) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / (1024 ** index);

  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 2)} ${units[index]}`;
};

const scanSvgFiles = async (directory = storageIconsRoot) => {
  const files = [];

  const scan = async (currentDirectory) => {
    let entries = [];

    try {
      entries = await fs.readdir(currentDirectory, { withFileTypes: true });
    } catch (error) {
      if (error.code === 'ENOENT') return;
      throw error;
    }

    await Promise.all(entries.map(async (entry) => {
      const entryPath = path.join(currentDirectory, entry.name);

      if (entry.isDirectory()) {
        await scan(entryPath);
        return;
      }

      if (entry.isFile() && entry.name.toLowerCase().endsWith('.svg')) {
        const stats = await fs.stat(entryPath);
        files.push({
          name: entry.name,
          path: entryPath,
          relative_path: entryPath.replace(path.join(__dirname, '..', '..'), '').replace(/\\/g, '/'),
          size: stats.size,
          modified_at: stats.mtime
        });
      }
    }));
  };

  await scan(directory);
  return files;
};

const getSvgStorageStats = async () => {
  const files = await scanSvgFiles();
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  const averageBytes = files.length ? totalBytes / files.length : 0;

  return {
    files,
    total_svg_files: files.length,
    total_storage_used_bytes: totalBytes,
    average_svg_size_bytes: averageBytes,
    total_storage_used: formatFileSize(totalBytes),
    average_svg_size: formatFileSize(averageBytes)
  };
};

module.exports = {
  formatFileSize,
  getSvgStorageStats,
  scanSvgFiles,
  storageIconsRoot
};
