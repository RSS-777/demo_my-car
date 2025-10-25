const fs = require('fs');
const path = require('path');

const deleteUserImages = async (userId) => {
    try {
        const dirPath = path.join(__dirname, '../uploads', userId.toString());

        if (!fs.existsSync(dirPath)) {
            return 'Директорія для користувача не знайдена, зображення не видалені';
        }

        const files = await fs.promises.readdir(dirPath);
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            await fs.promises.unlink(filePath); 
        }

        await fs.promises.rmdir(dirPath); 
        return 'Деректорія та її вміст успішно видалені';
    } catch (error) {
        throw new Error('Не вдалося видалити директорію або її вміст');
    }
};

module.exports = deleteUserImages;