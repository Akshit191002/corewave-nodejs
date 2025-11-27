const httpContext = require("express-http-context");
const logger = require("../config/logger.config")


module.exports.response = (code, message, data, req = {}) => {
    const loginDetails = httpContext.get("loginDetails");
    const logDetails = {
        method: req.method,
        endPoint: req.originalUrl,
        userId: loginDetails && loginDetails.loginId || "",
        code: code,
        message: message,
        data: data
    }
    // logger.info(`${code}, ${message}, ${JSON.stringify(data)}`);
    logger.info(JSON.stringify(logDetails));
    return { code: code, message: message, data: data }
}

// module.exports.response = (res, code, message, data) => {
//     return res.status(code).json({
//         success: code < 400,
//         message,
//         data
//     });
// };