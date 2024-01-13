/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import { IUserBody } from '../../types/user';
import User from './userModel';
import { UserMessages } from '../../utils/constant';
import { BadRequest, NotFoundError } from '../../error';
import mongoose from 'mongoose';
import jwt , {Secret} from 'jsonwebtoken'
import mailerService from './mailerService';
import dotenv from 'dotenv'
import { randomUUID } from 'crypto';
dotenv.config()


const UserModel: any = User;
class UserService {
  findByVerificationToken: any;
  /**
   * @function createUser
   * @description For creating new user
   * @param {IUserBody} userdata
   * @returns {Object}
   */
  async createUser(userdata: IUserBody): Promise<object> {
    const isUserPresent = await UserModel.findOne({
      $or: [
        { email: { $regex: new RegExp('^' + userdata.email.toLowerCase(), 'i') } },
        { username: { $regex: new RegExp('^' + userdata.username.toLowerCase(), 'i') } },
      ],
    });

    if (isUserPresent) {
      throw new BadRequest(UserMessages.ALREADY_EXISTS, true);
    }

    const verificationToken = randomUUID();

    // Add the verification token to the user data
    const userDataWithVerification = {
      ...userdata,
      verificationToken,
    };

    // Create a new user instance
    const newUser = new UserModel(userDataWithVerification);

    // Save the user to the database
    await newUser.save();

    // Construct the verification link
    const verificationLink = `http://oneforallcoin.com/verify?token=${verificationToken}`;

    // Send verification email
    await mailerService.sendVerificationEmail(newUser.email, verificationLink);

    return newUser;
  }

  /**
   * @function loginUser
   * @description For Loging user
   */

  async loginUser(email: string, password: string): Promise<{ token: string } | null> {
    const user = await UserModel.findOne({ email, password });
    if (!user) {
      return null;
    }
    const secretKey: Secret = process.env.JWT_SECRET_KEY || 'defaultSecretKey';
    console.log(secretKey)
    const token = jwt.sign({userId : user._id} , secretKey  , {expiresIn : '1d'} )

    return {token}
  }

  /**
   * @function updateUser
   * @description For creating new user
   * @param {mongoose.Types.ObjectId} userid
   *  @param {IUserBody} data
   *  @returns {Object}
   */
  async updateUser(userid: mongoose.Types.ObjectId, data: IUserBody): Promise<object> {
    const updateduser = await UserModel.findOneAndUpdate({ _id: userid }, { ...data }, { new: true });
    if (!updateduser) {
      throw new NotFoundError(`user not found with _id ${userid}`);
    }
    return updateduser;
  }

  /**
   * @function getUser
   * @description For creating new user
   * @param {mongoose.Types.ObjectId} userid
   *  @returns {Object}
   */
  async getUser(userid: string): Promise<object> {
    const mongooseUserId = new mongoose.Types.ObjectId(userid)
    const updateduser = await UserModel.findOne({ _id: mongooseUserId });
    if (!updateduser) {
      throw new NotFoundError(`user not found with id ${userid}`);
    }
    return updateduser;
  }


   async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const mongooseUserId = new mongoose.Types.ObjectId(userId);

    const user = await UserModel.findOne({ _id: mongooseUserId });

    if (!user) {
      throw new NotFoundError(`User not found with id ${userId}`);
    }

    // Check if the provided current password matches the user's current password
    if (user.password !== currentPassword) {
      throw new BadRequest('Current password is incorrect');
    }

    // Update the password field with the new password
    user.password = newPassword;

    // Save the updated user to the database
    await user.save();
  }

  

  /**
   * @function getUserList
   * @description For get user list
   * @param {Object} options
   * @param {Object} filter
   *  @returns {Object}
   */
  async getUserList(options: Object, query: Object): Promise<object> {
    console.log('vikash');

    var myAggregate = UserModel.aggregate([
      {
        $match: query,
      },
    ]);
    const userList = await UserModel.aggregatePaginate(myAggregate, options)
      .then(function (result: Object) {
        return result;
      })
      .catch(function (err: Error) {
        if (err) throw new NotFoundError(err);
      });

    return userList;
  }

  /**
   * @function deleteUser
   * @description For creating new user
   * @param {mongoose.Types.ObjectId} userid
   *  @returns {Object}
   */
  async deleteUser(userid: mongoose.Types.ObjectId): Promise<object> {
    const updateduser = await UserModel.findOneAndDelete({ _id: userid });
    if (!updateduser) {
      throw new NotFoundError(`user not found with id ${userid}`);
    }
    return updateduser;
  }
}

export default new UserService();
