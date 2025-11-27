// const BaseError = require("./base.error");

// class BadRequestError extends BaseError{
//     constructor(errorMessage){
//         super(400,"Bad Request Error",errorMessage);
//     }
// }

// module.exports = BadRequestError;


const BaseError = require("./base.error");

class BadRequestError extends BaseError {
    constructor(errorMessage) {
        super(400, errorMessage, "null.");
    }
}

module.exports = BadRequestError;
