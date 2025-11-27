const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT || 3001,
    DB_URL: process.env.DB_URL,
    IMAGE_SERVER: process.env.IMAGE_SERVER,
    JWT_TOKEN_SALT: process.env.JWT_TOKEN_SALT,
    JWT_EXPIRES: process.env.JWT_EXPIRES
}