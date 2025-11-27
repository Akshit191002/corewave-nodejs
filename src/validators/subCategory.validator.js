const joi = require("joi");
const BadRequestError = require("../errors/badRequest.error");

module.exports.createSubCategory = (req, resp, next) => {
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

module.exports.updateSubCategory = (req, resp, next) => {
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