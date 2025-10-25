const multer = require('multer');

const errorMulterMiddleware = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({ message: 'Файл занадто великий. Максимальний розмір: 256KB' });
        }
    } else if (err.message) {
        return res.status(422).json({ message: 'Невірний фотмат файлу. Дозволені формати: .jpeg, .png, .gif' })
    }
    return res.status(502).json({ message: 'Помилка сервера при обробці зображення' })

}
module.exports = errorMulterMiddleware;