import BaseError from './baseError.js';

class APIError extends BaseError {
    constructor(
        message,
        errors,
        name = 'AuthenticationError',
        httpCode = 500,
        isOperational = true
    ) {
        super(name, httpCode, message, errors, isOperational);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export default APIError;