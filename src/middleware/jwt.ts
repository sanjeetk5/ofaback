import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthenticationError } from '../error';

function verifyToken(req: Request, res: Response, next: NextFunction) {
  //Bearer Authorization
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      throw new AuthenticationError('Token not Found');
    }
    const tokens = auth?.split(' ');
    if (tokens?.length !== 2) {
      throw new AuthenticationError('Invalid token passed');
    }
    const [, token] = tokens;
    //verify token
    if (!process.env.JWT_SECRET_KEY) {
      throw new AuthenticationError('Jwt secret key is invalid');
    } else {
      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (typeof payload == 'object')
        req.user = {
          id: payload.id,
        };
      next();
    }
  } catch (error) {
    next(error);
  }
}

export { verifyToken };
