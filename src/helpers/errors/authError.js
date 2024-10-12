import BaseError from './baseError.js';

class AuthError extends BaseError {
    constructor(
        message,
        errors,
        name = 'Authenticate Error',
        httpCode = 401,
        isOperational = true
    ) {
        super(name, httpCode, message, errors, isOperational);
    }
}

export default AuthError;