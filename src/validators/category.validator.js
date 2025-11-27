const joi = require("joi");
const BadRequestError = require("../errors/badRequest.error");

module.exports.createCategory = (req, resp, next) => {
    const schema = joi.object({
        name: joi.string().required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.updateCategory = (req, resp, next) => {
    const schema = joi.object({
        name: joi.string().required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}