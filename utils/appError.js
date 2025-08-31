class AppError extends Error {
  //here exteded AppError class from Error
  constructor(message, statusCode) {
    super(message); //To call parent class
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
