/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Response } from 'express';
import { errorResponse } from '../utils/response';
import { JsonWebTokenError } from 'jsonwebtoken';
import { BaseError } from '../error';

function errorHandler(err: BaseError, req: any, res: Response, _next: NextFunction) {
  if (err instanceof JsonWebTokenError) {
    return errorResponse(res, err, 401, 'Jwt expired or malformed');
  }

  return errorResponse(res, err);
}

export { errorHandler };
