const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

const deleteUserImages = async (userId) => {
    try {
        const dirPath = path.join(__dirname, '../uploads', userId.toString());

        if (!fs.existsSync(dirPath)) {
            return 'User directory not found, images not deleted.';
        }

        const files = await fs.promises.readdir(dirPath);
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            await fs.promises.unlink(filePath); 
        }

        await fs.promises.rmdir(dirPath); 
        return 'The directory and its contents have been successfully deleted.';
    } catch (error) {
        logger.error(`Unable to delete directory for user`);
        throw new Error('Unable to delete directory or its contents.');
    }
};

module.exports = deleteUserImages;