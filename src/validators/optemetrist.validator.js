const joi = require("joi");
const BadRequestError = require("../errors/badRequest.error");

module.exports.sendOtp = (req, resp, next) => {
    const schema = joi.object({
        optemetristMobileNo: joi.string().length(10).required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.verifyOtp = (req, resp, next) => {
    const schema = joi.object({
        optemetristMobileNo: joi.string().length(10).required(),
        otp: joi.string().length(6).required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}