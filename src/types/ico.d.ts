import { Document, Models } from 'mongoose';

// interface which describe user document contains
export interface IcoDocs extends document<any> {
  userAddress: string;
  buyAmount: string;
  tokenAmount: string;
  createdOn: Date;
  updatedOn: Date;
  transactionHash: string;
  timestamp: string;
  buyType: string;
  referralReward: string;
  referralAddress: string;
}

// interface which describe model of userDocs
export interface IcoModel extends Model<any> {
  build(): IcoDocs;
}

export interface userController {
  createUser: controllerFunction;
  updateUser: controllerFunction;
  getUser: controllerFunction;
}

export interface IuserBody {
  username: string;
  email: string;
  age?: string;
  password: string;
  name?: string;
}
