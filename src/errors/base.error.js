class BaseError extends Error{
    constructor(code,message,data){
        super(message);
        this.code = code;
        this.message = message;
        this.data = data;
        // Error.captureStackTrace(this);
    }
}

module.exports = BaseError; 

