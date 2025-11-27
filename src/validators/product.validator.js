const joi = require("joi");
const BadRequestError = require("../errors/badRequest.error");

module.exports.createProduct = (req, resp, next) => {
    const schema = joi.object({
        name: joi.string().required(),
        price: joi.string().required(),
        description: joi.string().required()
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.updateProduct = (req, resp, next) => {
    const schema = joi.object({
        name: joi.string(),
        price: joi.string(),
        description: joi.string()
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}