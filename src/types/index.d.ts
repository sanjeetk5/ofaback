import { Multer } from 'multer';
import { Request, Response, NextFunction } from 'express';
export {};

//// <reference path="./user.d.ts" />

declare global {
  namespace Express {
    interface Request {
      user: user;
      file: Multer;
    }
  }
}

type controllerFunction = (req: Request, res: Response, next: NextFunction) => Promise<Response | undefined>;
