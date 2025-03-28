import fs from 'node:fs/promises';

export const createDirIfNotExists = async (url) => {
  try {
    await fs.access(url);
  } catch (e) {
    if (e.code === 'ENOENT') {
      await fs.mkdir(url);
    }
  }
};
