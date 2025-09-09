const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');
const BASE_UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

const deleteOldImage = async (imagePath) => {
  if (imagePath) {
    const absolutePath = path.resolve(BASE_UPLOAD_DIR, imagePath);

    if (!absolutePath.startsWith(BASE_UPLOAD_DIR)) {
      logger.warn(`Invalid file path attempted: ${absolutePath}`);
      return { ok: false, message: 'Invalid file path.' };
    }

    try {
      await fs.promises.access(absolutePath);
      await fs.promises.unlink(absolutePath);
      return { ok: true };
    } catch (err) {
      if (err.code === 'ENOENT') {
         logger.info(`The file to delete does not exist.`);
        return { ok: true };
      } else {
         logger.error('Unable to delete old image.');
        return { ok: false, message: 'Unable to delete old image.' };
      }
    }
  }
  return { ok: true };
};

module.exports = { deleteOldImage };