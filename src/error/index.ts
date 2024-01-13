/**
 * @description This is base class, which extends the Error to create custom error.If developer want to log, the error they must
 *  pass logging as true.
 */
class BaseError extends Error {
  success: boolean;
  logging: boolean;
  statusCode: number;
  constructor(message: string | Error, logging: boolean, statusCode: number) {
    if (typeof message == 'object') {
      message = message.message;
    }
    super(message);
    this.name = this.constructor.name;
    this.success = false;
    this.logging = logging;
    this.statusCode = statusCode;
  }
}

class ValidationError extends BaseError {
  constructor(error: any, logging?: boolean, statusCode?: number) {
    super(error, logging || false, statusCode || 400);
    Object.setPrototypeOf(this, ValidationError.prototype);
    this.message = error.message.replace(/["]/gi, '');
  }
}

class AuthenticationError extends BaseError {
  constructor(message: any, logging?: boolean, statusCode?: number) {
    super(message, logging || false, statusCode || 401);
  }
}

class NotFoundError extends BaseError {
  constructor(message: any, logging?: boolean, statusCode?: number) {
    super(message, logging || false, statusCode || 404);
  }
}
class BadRequest extends BaseError {
  constructor(message: any, logging?: boolean, statusCode?: number) {
    super(message, logging || false, statusCode || 400);
  }
}

class InternalError extends BaseError {
  constructor(message: any, logging?: boolean, statusCode?: number) {
    super(message, logging || false, statusCode || 500);
  }
}

class ApiError extends BaseError {
  constructor(message: any, logging?: boolean, statusCode?: number) {
    super(message, logging || false, statusCode || 429);
  }
}

export { ValidationError, AuthenticationError, NotFoundError, InternalError, BadRequest, BaseError, ApiError };
