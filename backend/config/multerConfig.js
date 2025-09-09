const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../uploads', req.user.userId.toString());

        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) {
                console.error('Failed to create directory');
                return cb(err, dir);
            }
            cb(null, dir);
        });
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file format. Allowed formats: .jpeg, .png, .gif'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 256 * 1024
    }
});

module.exports = upload;
