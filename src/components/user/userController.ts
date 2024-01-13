import { Request, Response, NextFunction } from 'express';
import { successResponse } from '../../utils/response';
import { BadRequest } from '../../error/index';
import { userServices as UserService } from './index';
import { UserMessages } from '../../utils/constant';
import mongoose from 'mongoose';
import { IUserBody } from '../../types/user';
import jwt, { Secret } from 'jsonwebtoken';
const ObjectId = mongoose.Types.ObjectId;

class User {
  /**
   * @function createUser
   * @description For creating new user
   * @param {Request} req The Request object
   * @param {Response} req The Request object
   * @param {NextFunction} next The next Function, used to pass control to next middleware
   * @author Nitesh Kumar Chaurasiya
   */
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, age, password, name }: IUserBody = req.body;
      const userdetails: IUserBody = {
        username,
        email,
        age,
        password,
        name,
      };

      const newUser = await UserService.createUser(userdetails);
      return successResponse(res, newUser);
    } catch (error: unknown) {
      next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    const { token } = req.query;

    try {
      // Fetch the user by the verification token
      const user = await UserService.findByVerificationToken(token);

      if (!user) {
        return res.status(404).json({ success: false, message: 'Invalid verification token' });
      }

      // Mark the user as verified
      user.isVerified = true;
      await user.save();

      return res.status(200).json({ success: true, message: 'Email verified successfully' });
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: { email: string; password: string } = req.body;
      if (!email || !password) {
        return res.status(400).send({ msg: 'Email and password are required' });
      }

      const tokenResponse = await UserService.loginUser(email, password);

      if (tokenResponse) {
        return res.status(200).json(tokenResponse);
      } else {
        return res.status(401).json({ msg: 'Invalid email or password' });
      }
    } catch (error: unknown) {
      next(error);
    }
  }

  // async loginAdmin(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { email, password }: { email: string; password: string } = req.body;

  //     // Hardcoded admin credentials
  //     const adminEmail = 'admin@example.com';
  //     const adminPassword = 'admin123';

  //     if (email === adminEmail && password === adminPassword) {
  //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //       const secretKey: Secret = process.env.JWT_SECRET_KEY || 'defaultSecretKey';
  //       console.log(secretKey);
  //       // Create a JWT token
  //       const token = jwt.sign({ email }, secretKey, { expiresIn: '1d' });
  //       console.log(token);

  //       // Return the token or session information as needed
  //       return res.status(200).json({ msg: 'Admin login successful', token });
  //     } else {
  //       return res.status(401).json({ msg: 'Invalid email or password' });
  //     }
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // }

  /**
   * @function updateUser
   * @description For updating the existing user
   * @param {Request} req The Request object
   * @param {Response} req The Request object
   * @param {NextFunction} next The next Function, used to pass control to next middleware
   * @author Nitesh Kumar Chaurasiya
   */
  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const userid = req.body?._id.toString();
      if (!userid) {
        throw new BadRequest(UserMessages.USER_ID_REQUIRED);
      }
      //validate userid is valid mongoose ObjectId or Not
      if (ObjectId.isValid(userid)) {
        const data = await UserService.updateUser(new ObjectId(userid), req.body);
        return successResponse(res, data, UserMessages.USER_UPDATE_SUCCESS);
      } else {
        throw new BadRequest(UserMessages.INVALID_ID);
      }
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * @function getUser
   * @description This function is used to fetch user information
   * @param {Request} req The Request object
   * @param {Response} req The Request object
   * @param {NextFunction} next The next Function, used to pass control to next middleware
   * @author Nitesh Kumar Chaurasiya
   */
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new BadRequest(UserMessages.UNAUTHORIZED);
      }

      const secretKey: Secret = process.env.JWT_SECRET_KEY || 'defaultSecretKey';
      const decodedToken = jwt.verify(token, secretKey) as { userId: string };
      console.log('ofa');
      const userid = decodedToken.userId;
      if (!userid) {
        throw new BadRequest(UserMessages.USER_ID_REQUIRED);
      }
      //validate userid is valid mongoose ObjectId or Not

      const data = await UserService.getUser(userid);
      return successResponse(res, data, UserMessages.FOUND_SUCCESS);
    } catch (error: unknown) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new BadRequest(UserMessages.UNAUTHORIZED);
      }

      const secretKey: Secret = process.env.JWT_SECRET_KEY || 'defaultSecretKey';
      const decodedToken = jwt.verify(token, secretKey) as { userId: string };

      const userId = decodedToken.userId;
      if (!userId) {
        throw new BadRequest(UserMessages.USER_ID_REQUIRED);
      }

      const { currentPassword, newPassword } = req.body;

      await UserService.changePassword(userId, currentPassword, newPassword);

      res.status(200).json({ message: 'Password changed succesfully' });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * @function getUserList
   * @description This function is used to fetch user list
   * @param {Request} req The Request object
   * @param {NextFunction} next The next Function, used to pass control to next middleware
   * @author Nitesh Kumar Chaurasiya
   */
  async getUserList(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, search } = req.query;
      let options = {
        page: page ? page : 1,
        limit: limit ? limit : 10,
        sort: { _id: -1 },
      };

      let query: Object = {};
      if (search) {
        let searchQuery = { $regex: new RegExp(`${search}`, 'i') };
        query = {
          ...query,
          $and: [
            {
              $or: [{ username: searchQuery }, { email: searchQuery }, { name: searchQuery }],
            },
          ],
        };
      }

      const result = await UserService.getUserList(options, query);
      return successResponse(res, result, UserMessages.FOUND_SUCCESS);
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * @function deleteUser
   * @description This function is used to delete user information from database.
   * @param {Request} req The Request object
   * @param {Response} req The Request object
   * @param {NextFunction} next The next Function, used to pass control to next middleware
   * @author Nitesh Kumar Chaurasiya
   */
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userid = req.params?.userid.toString();
      if (!userid) {
        throw new BadRequest(UserMessages.USER_ID_REQUIRED);
      }
      //validate userid is valid mongoose ObjectId or Not
      if (ObjectId.isValid(userid)) {
        await UserService.deleteUser(new ObjectId(userid));
        return successResponse(res, null);
      } else {
        throw new BadRequest(UserMessages.INVALID_ID);
      }
    } catch (error: unknown) {
      next(error);
    }
  }
}

export default new User();
