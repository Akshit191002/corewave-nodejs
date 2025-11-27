"use strict";
const path = require("path");
module.exports.publicFolder = path.join(__dirname, "..", "..", "assests");

module.exports.allowedImageExt = [".jpg", ".png", ".jpeg"];

module.exports.dbStatus = {
    active: "ACTIVE",
    inactive: "INACTIVE",
    expiry: "EXPIRY",
    deleted: "DELETED",
    pending: "PENDING",
    rejected: "REJECTED",
    submitted: "SUBMITTED",
    verified: "VERIFIED"
};

module.exports.defaultPagination = {
    currentPage: 0,
    itemsPerPage: 10
};
