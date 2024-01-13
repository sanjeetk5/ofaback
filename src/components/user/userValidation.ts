import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../../error';

class UserValidation {
  async createUserValidation(req: Request, res: Response, next: NextFunction) {
    //firstname,lastname,emailId,password
    try {
      const schema = Joi.object({
        username: Joi.string()
          .alphanum()
          .min(2)
          .message('username must be minimum of 2 letter')
          .max(50)
          .message('username can be of maximum 50 letter')
          .required(),
        password: Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2 }),
        age: Joi.number().allow(),
        name: Joi.string().allow(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        throw new ValidationError(error, true);
      } else {
        next();
      }
    } catch (error: any) {
      next(error);
    }
  }

  async updateValidation(req: Request, res: Response, next: NextFunction) {
    //firstname,lastname,emailId,password
    try {
      const schema = Joi.object({
        _id: Joi.string().required(),
        age: Joi.number().allow(),
        name: Joi.string().allow(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        throw new ValidationError(error, true);
      } else {
        next();
      }
    } catch (error: any) {
      next(error);
    }
  }
}

export default new UserValidation();
