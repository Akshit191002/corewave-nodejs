const joi = require("joi");
const BadRequestError = require("../errors/badRequest.error");

module.exports.adminRegister = (req, resp, next) => {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
    });
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
};

module.exports.adminLogin = (req, resp, next) => {
    const schema = joi.object({
        email: joi.string().required(),
        password: joi.string().required(),
    });
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
};

module.exports.addEyeSetuCategory = (req, resp, next) => {
    const schema = joi.object({
        bannerImage: joi.string().optional(),
        name: joi.string().required(),
        description: joi.string().required()
    });
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.updateEyeSetuCategory = (req, resp, next) => {
    const schema = joi.object({
        eyeSetuCategoryId: joi.string().required(),
        bannerImage: joi.string().optional(),
        description: joi.string().required()
    });
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.addEyeSetuSubCategory = (req, resp, next) => {
    const schema = joi.object({
        eyeSetuCategoryId: joi.string().required(),
        name: joi.string().required(),
        for: joi.string().required()
    });
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.updateEyeSetuSubCategory = (req, resp, next) => {
    const schema = joi.object({
        eyeSetuSubCategoryId: joi.string().required(),
        name: joi.string().required(),
        for: joi.string().required()
    });
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.addSpecialization = (req, resp, next) => {
    const schema = joi.object({
        specializationImage: joi.string().optional(),
        specializationName: joi.string().required()
    });
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.updateSpecialization = (req, resp, next) => {
    const schema = joi.object({
        specializationId: joi.string().required(),
        specializationImage: joi.string().optional(),
        specializationName: joi.string().required()
    });
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.addService = (req, resp, next) => {
    const schema = joi.object({
        eyeSetuCategoryId: joi.string().required(),
        eyeSetuSubCategoryId: joi.string().required(),
        serviceName: joi.string().required(),
        serviceImage: joi.string().optional(),
        description: joi.string().required(),
        aboutService: joi.string().required(),
        specialization: joi.array().items(joi.string()).required(),
        servicePrice: joi.number().required(),
        durationInMinutes: joi.number().required()
    })

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.updateService = (req, resp, next) => {
    const schema = joi.object({
        serviceId: joi.string().required(),
        eyeSetuCategoryId: joi.string().required(),
        eyeSetuSubCategoryId: joi.string().required(),
        serviceName: joi.string().required(),
        serviceImage: joi.string().optional(),
        description: joi.string().required(),
        aboutService: joi.string().required(),
        specialization: joi.array().items(joi.string()).required(),
        servicePrice: joi.number().required(),
        durationInMinutes: joi.number().required()
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.activeInactiveService = (req, resp, next) => {
    const schema = joi.object({
        serviceId: joi.string().required()
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.deleteService = (req, resp, next) => {
    const schema = joi.object({
        serviceId: joi.string().required()
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.createDoctorProfile = async (req, resp, next) => {
    const schema = joi.object({
        doctorProfilephoto: joi.string().optional(),
        doctorName: joi.string().required(),
        doctorMobileNo: joi.string().length(10).required(),
        doctorEmail: joi.string().required(),
        doctorDesignation: joi.string().required(),
        doctorGender: joi.string().required(),
        doctorAge: joi.number().required(),
        doctorExperienceInYears: joi.number().required(),
        doctorQualification: joi.string().required(),
        doctorSpecialization: joi.array().required(),
        doctorLicenseCertificate: joi.string().optional(),
    })

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.updateDoctorProfile = async (req, resp, next) => {
    const schema = joi.object({
        doctorProfileId: joi.string().required(),
        doctorProfilephoto: joi.string().optional(),
        doctorName: joi.string().optional(),
        doctorMobileNo: joi.string().optional(),
        doctorEmail: joi.string().optional(),
        doctorDesignation: joi.string().optional(),
        doctorGender: joi.string().optional(),
        doctorAge: joi.number().optional(),
        doctorExperienceInYears: joi.number().optional(),
        doctorQualification: joi.string().optional(),
        doctorSpecialization: joi.array().optional(),
        doctorLicenseCertificate: joi.string().optional(),
    })

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.getDoctorProfileById = async (req, resp, next) => {
    const schema = joi.object({
        doctorProfileId: joi.string().required(),
    })

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.deleteDoctorProfile = async (req, resp, next) => {
    const schema = joi.object({
        doctorProfileId: joi.string().required(),
    })

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.createOptemetristProfile = async (req, resp, next) => {
    const schema = joi.object({
        optemetristProfilephoto: joi.string().optional(),
        optemetristLicenseCertificate: joi.string().optional(),
        optemetristName: joi.string().required(),
        optemetristMobileNo: joi.string().length(10).required(),
        optemetristEmail: joi.string().required(),
        optemetristDesignation: joi.string().required(),
        optemetristGender: joi.string().required(),
        optemetristAge: joi.number().required(),
        optemetristAddress: joi.string().required(),
        optemetristCity: joi.string().required(),
        optemetristState: joi.string().required(),
        optemetristZipCode: joi.string().required(),
    })

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.updateOptemetristProfile = async (req, resp, next) => {
    const schema = joi.object({
        optemetristId: joi.string().required(),
        optemetristProfilephoto: joi.string().optional(),
        optemetristLicenseCertificate: joi.string().optional(),
        optemetristName: joi.string().optional(),
        optemetristMobileNo: joi.string().length(10).optional(),
        optemetristEmail: joi.string().optional(),
        optemetristDesignation: joi.string().optional(),
        optemetristGender: joi.string().optional(),
        optemetristAge: joi.number().optional(),
        optemetristAddress: joi.string().optional(),
        optemetristCity: joi.string().optional(),
        optemetristState: joi.string().optional(),
        optemetristZipCode: joi.string().optional(),
    })

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.getOptemetristProfileById = async (req, resp, next) => {
    const schema = joi.object({
        optemetristId: joi.string().required(),
    })

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.deleteOptemetristProfile = async (req, resp, next) => {
    const schema = joi.object({
        optemetristId: joi.string().required(),
    })

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.updateOptemetristAvailability = async (req, resp, next) => {
    const schema = joi.object({
        optemetristAvailabilityId: joi.string().required(),
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
    })

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.addServiceArea = async (req, resp, next) => { 
    const schema = joi.object({
        areaName: joi.string().required(),
        pinCode: joi.string().required(),
    })

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}

module.exports.updateServiceArea = async (req, resp, next) => {
    const schema = joi.object({
        serviceAreaId: joi.string().required(),
        areaName: joi.string().optional(),
        pinCode: joi.string().required(),
    })

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(", ");
        throw new BadRequestError(errorMessage);
    }
    next();
}
