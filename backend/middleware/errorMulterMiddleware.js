const multer = require('multer');

const errorMulterMiddleware = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({ message: 'File is too large. Maximum size: 256KB.' });
        }
    } else if (err.message) {
        return res.status(422).json({ message: 'Invalid file format. Allowed formats: .jpeg, .png, .gif.' })
    }
    return res.status(502).json({ message: 'Server error while processing image.' })

}
module.exports = errorMulterMiddleware;