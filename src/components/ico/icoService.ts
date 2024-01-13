import BuyDetail from './icoModel';
import { BadRequest, NotFoundError } from '../../error';
import mongoose from 'mongoose';

const BuyDetailModel: any = BuyDetail;

class icoService {
  public async saveBuyTokenDetail(data: any) {
    try {
      if (data) {
        console.log('data :>> ', data);
        const isTxnExits = await BuyDetailModel.find({
          transactionHash: data.transactionHash,
        });
        console.log('isTxnExits :>> ', isTxnExits.length);
        if (isTxnExits.length <= 0) {
          console.log('1 :>> ', data);
          await BuyDetailModel.create(data);
        }
      }
    } catch (error: any) {
      return error;
    }
  }

  public async saveClaimDetails(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        BuyDetailModel.updateMany(
          { userAddress: data.userAddress },
          { $set: data },
          { new: true },
          function (err: any, response: any) {
            if (err) return reject(err);
            resolve(response);
          },
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  async getBuytokenDetails(option: any, query: any): Promise<object> {
    const myAggregate = BuyDetailModel.aggregate([
      {
        $match: query,
      },
    ]);
    const token = await BuyDetailModel.aggregatePaginate(myAggregate, option)
      .then(function (result: any) {
        return result;
      })
      .catch(function (err: Error) {
        if (err) throw new NotFoundError(err);
      });

    return token;
  }

  async exportTransaction(query: object) {
    let myAggregate = BuyDetailModel.aggrerate(function (err: any, result: any) {
      if (err) throw err;
      return result;
    });
    let res = await BuyDetailModel.aggregatePaginate(myAggregate)
      .then(function (result: object) {
        return result;
      })
      .catch(function (err: Error) {
        if (err) throw new NotFoundError(err);
      });
    return res;
  }
}

export default new icoService();
