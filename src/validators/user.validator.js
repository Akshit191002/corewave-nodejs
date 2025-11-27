const joi = require("joi");
const BadRequestError = require("../errors/badRequest.error");

module.exports.sendOtp = (req, resp, next) => {
    const schema = joi.object({
        mobile: joi.string().length(10).required(),
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
        mobile: joi.string().length(10).required(),
        otp: joi.string().length(6).required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.register = (req, resp, next) => {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.updateProfileDetails = (req, resp, next) => {
    const schema = joi.object({
        profilePhoto: joi.string().optional(),
        userName: joi.string().required(),
        email: joi.string().optional(),
        gender: joi.string().required(),
        age: joi.string().required(),
    });
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.addMemberProfile = (req, resp, next) => {
    const schema = joi.object({
        memberProfilePhoto: joi.string().optional(),
        memberUserName: joi.string().required(),
        memberEmail: joi.string().required(),
        memberGender: joi.string().required(),
        memberAge: joi.string().required(),
    });
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.updateMemberProfile = (req, resp, next) => {
    const schema = joi.object({
        memberId: joi.string().required(),
        memberProfilePhoto: joi.string().optional(),
        memberUserName: joi.string().required(),
        memberEmail: joi.string().required(),
        memberGender: joi.string().required(),
        memberAge: joi.string().required(),
    });
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.deleteMemberProfile = (req, resp, next) => {
    const schema = joi.object({
        memberId: joi.string().required(),
    });
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}