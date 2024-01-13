import { Document, Model } from 'mongoose';

//interface which describe user codumcent contains;
export interface UserDocs extends Document<any> {
  username: string;
  email: string;
  password: string;
  age: string;
  name: string;
  walletAddress: string;
  createdOn: Date;
  updatedOn: Date;
}

//interface which describe model of userDocs
export interface UserModel extends Model<any> {
  build(): UserDocs;
}

export interface UserController {
  createUser: controllerFunction;
  updateUser: controllerFunction;
  getUser: controllerFunction;
}

export interface IUserBody {
  username: string;
  email: string;
  age?: string;
  password: string;
  name?: string;
  walletAddress?: string;
}
