const joi = require("joi");
const BadRequestError = require("../errors/badRequest.error");

module.exports.sendOtp = (req, resp, next) => {
    const schema = joi.object({
        doctorMobileNo: joi.string().length(10).required(),
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
        doctorMobileNo: joi.string().length(10).required(),
        otp: joi.string().length(6).required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.createAvailability = (req, resp, next) => {
    const schema = joi.object({
        Sunday: {
            startTime: joi.string().optional(),
            endTime: joi.string().optional()
        },
        Monday: {
            startTime: joi.string().optional(),
            endTime: joi.string().optional()
        },
        Tuesday: {
            startTime: joi.string().optional(),
            endTime: joi.string().optional()
        },
        Wednesday: {
            startTime: joi.string().optional(),
            endTime: joi.string().optional()
        },
        Thursday: {
            startTime: joi.string().optional(),
            endTime: joi.string().optional()
        },
        Friday: {
            startTime: joi.string().optional(),
            endTime: joi.string().optional()
        },
        Saturday: {
            startTime: joi.string().optional(),
            endTime: joi.string().optional()
        },
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.updateAvailability = (req, resp, next) => {
    const schema = joi.object({
        availabilityId: joi.string().required(),
        Sunday: {
            startTime: joi.string().optional(),
            endTime: joi.string().optional()
        },
        Monday: {
            startTime: joi.string().optional(),
            endTime: joi.string().optional()
        },
        Tuesday: {
            startTime: joi.string().optional(),
            endTime: joi.string().optional()
        },
        Wednesday: {
            startTime: joi.string().optional(),
            endTime: joi.string().optional()
        },
        Thursday: {
            startTime: joi.string().optional(),
            endTime: joi.string().optional()
        },
        Friday: {
            startTime: joi.string().optional(),
            endTime: joi.string().optional()
        },
        Saturday: {
            startTime: joi.string().optional(),
            endTime: joi.string().optional()
        },
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}