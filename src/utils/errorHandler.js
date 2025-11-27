const httpContext = require("express-http-context");
// const logger = require("../config/logger.config");
const BaseError = require("../errors/base.error");

function errorHandler(err, req, resp, next) {
    const loginDetails = httpContext.get("loginDetails");
    const isBaseError = err instanceof BaseError;
    const logDetails = {
        method: req.method,
        endPoint: req.originalUrl,
        userId: loginDetails && loginDetails.loginId || "",
        code: isBaseError ? err.code : 500,
        message: isBaseError ? err.message : "Something Went Wrong",
        data: isBaseError ? err.data : err.stack
    }
    // logger.error(JSON.stringify(logDetails));
    return resp.status(logDetails.code).json({
        code: logDetails.code,
        message: logDetails.message,
        // data: logDetails.data
    });
}

module.exports = errorHandler;