import Block from './blockModel';

export default class BlockService {
  public saveblockInfo = async (contract: any, lastBlock: any, chainType: any) => {
    console.log('---->>>>>--', contract, lastBlock, chainType);
    return new Promise(async (resolve, reject) => {
      try {
        Block.updateOne({ contract, chainType }, { lastBlock }, { upsert: true }, function (err, response) {
          if (err) return reject(err);
          resolve(response);
        });
      } catch (err) {
        console.log('error', err);
        reject(err);
      }
    });
  };

  public getBlockInfo = async (contract: any, chainType: any) => {
    return new Promise((resolve, reject) => {
      try {
        Block.findOne({ contract, chainType }, function (err: any, result: any) {
          if (err) return reject(err);
          resolve(result);
        });
      } catch (err) {
        console.log('error', err);
        reject(err);
      }
    });
  };

  public saveUpdateCronStatus = async (contract: any, chainType: any, cronInProcess: any) => {
    return new Promise((resolve, reject) => {
      try {
        Block.updateOne({ contract, chainType }, { cronInProcess }, { upsert: true }, function (err, response) {
          if (err) return reject(err);
          resolve(response);
        });
      } catch (err) {
        console.log('error', err);
        reject(err);
      }
    });
  };
}
