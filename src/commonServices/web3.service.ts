/* eslint-disable prefer-const */
import Web3 from 'web3';
import { BlockService } from '../components/blocks';
import { myContractABI } from '../abi/DregnICOABI';
import { myTokensABI } from '../abi/OfaToken';
import config from '../config/env';

export default class web3Service {
  public web3Instance: any;
  public blockService = new BlockService();

  public getInstance = async (contract: any, network: any, dynamicAddress = '') => {
    return new Promise(async (resolve, reject) => {
      try {
        let contractInstance: any;
        this.web3Instance = new Web3(network.rpc);
        if (contract === 'ico') {
          contractInstance = new this.web3Instance.eth.Contract(myContractABI, network.icoAddress);
        }

        resolve(contractInstance);
      } catch (err) {
        console.log('error', err);
        reject(err);
      }
    });
  };

  public callGetMethod = async (method: any, data: any, contractType: any, network: any, dynamicAddress = '') => {
    return new Promise(async (resolve, reject) => {
      try {
        let contract: any = await this.getInstance(contractType, network, dynamicAddress);
        if (contract?.methods) {
          contract.methods[method]
            .apply(null, Array.prototype.slice.call(data))
            .call()
            .then((result: any) => {
              resolve(result);
            })
            .catch((error: any) => {
              reject(error);
            });
        } else {
          reject(new Error('Contract not found'));
        }
      } catch (error) {
        console.log('error', error);
        reject(error);
      }
    });
  };

  public getStartEndBlock = async (type: any, contractStartBlock: any, network: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        let fromBlock = contractStartBlock;
        const eventBatchSize = config.EVENT_BATCH_SIZE as number;

        let blockInfo: any = await this.blockService.getBlockInfo(type, network.chainType);

        if (blockInfo) {
          if (blockInfo.cronInProcess) {
            resolve(false);
          }
          if (blockInfo.lastBlock) {
            fromBlock = (parseInt(blockInfo.lastBlock) + 1).toString();
          }
        }
        const startBlock = fromBlock;

        this.web3Instance = new Web3(network.rpc);
        const currentBlock = await this.web3Instance.eth.getBlockNumber();
        let endBlock = parseInt(startBlock) + Number(eventBatchSize);
        if (parseInt(startBlock) + Number(config.EVENT_BATCH_SIZE) > Number(currentBlock)) {
          endBlock = currentBlock;
        }
        resolve({
          startBlock,
          endBlock: endBlock.toString(),
          cronInProcess: blockInfo?.cronInProcess,
        });
      } catch (err) {
        console.log('error', err);
        reject(err);
      }
    });
  };
}
