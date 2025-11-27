const BaseError = require("./base.error");

class UnAuthorize extends BaseError{
    constructor(message,data){
        super(401,message,data);
    }
}

module.exports = UnAuthorize;