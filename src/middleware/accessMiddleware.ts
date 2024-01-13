import { Request, Response, NextFunction } from 'express';
import { AuthenticationError } from '../error';
import { HttpStatusCode, UserMessages } from '../utils/constant';

/**
 * @function userOnly
 * @description This function is used as access controle, it will allow the user only to access the api.
 * @param req
 * @param res
 * @param next
 */
function userOnly(req: Request, res: Response, next: NextFunction) {
  const userid = req.params?.userid || req.query?.userid || req.body?.userid;
  if (req.user && req.user?.id == userid) {
    next();
  } else {
    next(new AuthenticationError(UserMessages.ACCESS_DENIED, true, HttpStatusCode.FORBIDDEN));
  }
}

export { userOnly };
