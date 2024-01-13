/* eslint-disable prefer-const */
import Web3Service from './commonServices/web3.service';
import BlockService from './components/blocks/blockService';
import { IcoService } from './components/ico/index';
import config from './config/env';

export default class CronService {
  public blockService = new BlockService();
  public web3Service = new Web3Service();

  public getIcoEvents = async (network: any) => {
    const blockInfo: any = await this.web3Service.getStartEndBlock('ico', network.startBlockICO, network);
    if (parseInt(blockInfo.startBlock) < parseInt(blockInfo.endBlock) && !blockInfo.cronInProcess) {
      try {
        await this.blockService.saveUpdateCronStatus('ico', network.chainType, true);
        const icoInstance: any = await this.web3Service.getInstance('ico', network);

        const getAllEvents = await icoInstance.getPastEvents('allEvents', {
          fromBlock: blockInfo.startBlock,
          toBlock: blockInfo.endBlock,
        });
        if (getAllEvents.length > 0) {
          await this.blockService.saveblockInfo(
            'ico',
            getAllEvents[getAllEvents.length - 1].blockNumber,
            network.chainType,
          );
          for (const eventInformation of getAllEvents) {
            // console.log('eventInformation', eventInformation);
            if (eventInformation.event) {
              switch (eventInformation.event) {
                case 'BuyTokenDetail':
                  console.log('BuyTokenDetail :>> ');
                  eventInformation.returnValues.chainType = network.chainType;
                  eventInformation.returnValues.transactionHash = eventInformation.transactionHash;
                  await IcoService.saveBuyTokenDetail(eventInformation.returnValues);
                  // await userManagementService.saveBuyTokenDetail(eventInformation.returnValues);
                  break;

                default:
                  break;
              }
            }
          }
        } else {
          await this.blockService.saveblockInfo('ico', blockInfo.endBlock, network.chainType);
        }
        await this.blockService.saveUpdateCronStatus('ico', network.chainType, false);
      } catch (error) {
        await this.blockService.saveUpdateCronStatus('ico', network.chainType, false);
      }
    }
  };

  public getRewardsEvents = async (network: any) => {
    let blockInfo: any = await this.web3Service.getStartEndBlock('rewards', network.startBlockToken, network);
    if (parseInt(blockInfo.startBlock) < parseInt(blockInfo.endBlock) && !blockInfo.cronInProcess) {
      try {
        await this.blockService.saveUpdateCronStatus('rewards', network.chainType, true);
        let icoInstance: any = await this.web3Service.getInstance('rewards', network);
        const getAllEvents = await icoInstance.getPastEvents('allEvents', {
          fromBlock: blockInfo.startBlock, //31748060
          toBlock: blockInfo.endBlock,
        });

        if (getAllEvents.length > 0) {
          await this.blockService.saveblockInfo(
            'rewards',
            getAllEvents[getAllEvents.length - 1].blockNumber,
            network.chainType,
          );
          for (const eventInformation of getAllEvents) {
            if (eventInformation.event) {
              switch (eventInformation.event) {
                case 'RewardsClaimed':
                  eventInformation.returnValues.chainType = network.chainType;
                  eventInformation.returnValues.transactionHash = eventInformation.transactionHash;
                  eventInformation.returnValues.userAddress = eventInformation.returnValues.userAddress.toLowerCase();
                  // await userManagementService.saveBuyTokenDetail(eventInformation.returnValues);
                  break;
                default:
                  break;
              }
            }
          }
        } else {
          await this.blockService.saveblockInfo('rewards', blockInfo.endBlock, network.chainType);
        }
        await this.blockService.saveUpdateCronStatus('rewards', network.chainType, false);
      } catch (error) {
        await this.blockService.saveUpdateCronStatus('rewards', network.chainType, false);
      }
    }
  };

  public jsonConcat(o1: any, o2: any) {
    for (var key in o2) {
      o1[key] = o2[key];
    }
    return o1;
  }
  public handleAllEvents = async () => {
    this.getIcoEvents(config.Networks);
    this.getRewardsEvents(config.Networks);
  };
}
