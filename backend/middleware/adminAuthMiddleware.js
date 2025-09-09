require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const adminAuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'You must log in.' })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: administrator rights required.' })
        }

        req.user = decoded
        next()
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token.' })
    }
};

module.exports = adminAuthMiddleware;