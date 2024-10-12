import BaseError from './baseError.js';

class FormError extends BaseError {
    constructor(
        message,
        errors,
        name = 'FormError',
        httpCode = 422,
        isOperational = true
    ) {
        super(name, httpCode, message, errors, isOperational);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export default FormError;