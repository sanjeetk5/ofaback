import cron from 'node-cron';
import CronService from '../cron';
import { BlockService } from '../components/blocks';
import config from '../config/env';
import async from 'async';

class MainService {
  public cronService = new CronService();
  public blockService = new BlockService();

  public getEvents = async () => {
    cron.schedule('*/5 * * * * *', () => {
      // console.log("cron start")
      this.setAllCronStatus(config.Networks);
      // console.log("cron2")
      this.cronService.handleAllEvents();
      // console.log("cron done")
    });
  };

  public setAllCronStatus = async (networks: any) => {
    await this.blockService.saveUpdateCronStatus('ico', networks.chainType, false);
  };
}

export default new MainService();
