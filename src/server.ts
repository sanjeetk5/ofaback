import { Application } from 'express';
import applicationInitialization from './init';
import logger from './utils/logger';
import http from 'http';
import config from './config/env';
import MainService from './commonServices/main'

async function startServer() {
  try {
    const app: Application = await applicationInitialization();
    const server: http.Server = http.createServer(app);

    server.listen(config.PORT, () => {
      logger.info(`server started on ${config.PORT}`);
      logger.info(`server Url ${config.API_URL}`);
    });
    MainService.getEvents()
    return server;
  } catch (error: any) {
    logger.error('Error occured when starting server:::', error);
  }
}

export default startServer();
