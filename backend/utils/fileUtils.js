const path = require('path');
const fs = require('fs');

const deleteOldImage = async (imagePath) => {
    if (imagePath) {
        const absolutePath = path.join(__dirname, '..', imagePath);

        try {
            await fs.promises.access(absolutePath);
            await fs.promises.unlink(absolutePath);
            return { ok: true };
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.log('Файл для видалення не існує');
                return { ok: true };
            } else {
                console.error('Не вдалося видалити старе зображення');
                return { ok: false, message: 'Не вдалося видалити старе зображення' };
            }
        }
    }
    return { ok: true };
};

module.exports = { deleteOldImage };