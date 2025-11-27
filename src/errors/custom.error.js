const BaseError = require("./base.error");

class CustomError extends BaseError {
  constructor(message, code = 410, data = null) {
    super(code, message, data); 
    this.code = code;
    this.data = data;
  }
}

module.exports = CustomError;
