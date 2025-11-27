const BaseError = require("./base.error");

class NotFoundError extends BaseError{
    constructor(message,data){
        super(404,message,data);
    }
}

module.exports = NotFoundError;