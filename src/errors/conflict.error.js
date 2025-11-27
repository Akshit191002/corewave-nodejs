const BaseError = require("./base.error");

class ConflictError extends BaseError{
    constructor(message,data){
        super(409,message,data);
    }
}

module.exports = ConflictError;