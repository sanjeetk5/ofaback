/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import AggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { IcoDocs, IcoModel } from '../../types/ico';

const buyDetailSchema = new mongoose.Schema<IcoDocs>({
  userAddress: {
    type: String,
    required: true,
  },
  tokenAmount: {
    type: String,
  },
  timestamp: {
    type: String,
  },
  buyAmount: {
    type: String,
  },
  buyType: {
    type: String,
  },
  transactionHash: {
    type: String,
  },
  referralReward:{
    type: String,
  },
  referralAddress:{
    type:String,
  },
  createdOn:{
    type: Date,
    default: Date.now,
  },
  updatedOn:{
    type: Date,
    default: Date.now,
  }
});

buyDetailSchema.plugin(AggregatePaginate);

const BuyDetail = mongoose.model<IcoDocs, IcoModel>('ico-transaction', buyDetailSchema);

export default BuyDetail;
