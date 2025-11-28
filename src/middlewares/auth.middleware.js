const jwt = require('jsonwebtoken');
require('dotenv').config()
exports.authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
        const verifyToken = jwt.verify(token, process.env.JWT_TOKEN_SALT)
        req.user = { _id: verifyToken.id };
        next()
    } catch (err) {
        const status = err.code;
        res.status(status).json({
            success: false,
            message: err.message
        });
    }
};