import { Request, Response, NextFunction } from 'express';
import { successResponse } from '../../utils/response';
import { BadRequest } from '../../error/index';
import { IcoService } from './index';
import mongoose from 'mongoose';
import moment from 'moment';
const ObjectId = mongoose.Types.ObjectId;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const csv = require('csv-express');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require('lodash');

class Ico {
  async getBuyTokenDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, userAddress } = req.query;
      // console.log(userAddress)
      const data: any = {};
      const options: any = { sort: { _id: -1 } };
      if (page) options.page = page;
      if (limit) options.limit = limit;
      if (userAddress) {
        const searchQuery = { $regex: new RegExp(`${userAddress}`, 'i') };
        if (searchQuery) data.userAddress = searchQuery;
      }
      const result = await IcoService.getBuytokenDetails(options, data);
      return successResponse(res, result);
    } catch (error: unknown) {
      next(error);
    }
  }

  // async exportTransectionsCSV(req: Request, res:any, next: NextFunction){
  //     try{
  //         const { buyerAddress} = req.query;
  //         let data: any = {};
  //         if (buyerAddress){
  //             if(buyerAddess) data.buyerAddess = buyerAddress;
  //         }
  //         var filename = `${'USER-TRANSECTIONS'}_${new Date().toJSON().slice(0,10)}.csv`;
  //         const result: any = await IcoService.exportTransectionsCSV(data);
  //         let transectionsInfo = result.docs;
  //         _.each(transectionsInfo, async function (item: any, i:any){
  //             let temp: any = {};
  //             temp.S_NO = i+1
  //         })
  //     }
  // }
}

export default new Ico();
