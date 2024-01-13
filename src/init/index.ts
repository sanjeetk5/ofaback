import { Application } from 'express';
import express from 'express';
import expressLoader from './express';
import mongooseLoader from './databaseConnection';
import exceptionhandler from './uncaughtExceptionHandler';
import logger from '../utils/logger';

export default async (): Promise<Application> => {
  try {
    const application = express();
    await mongooseLoader();
    logger.info('Database started');
    const applicatios: Application = await expressLoader({ app: application });
    logger.info('Express Intialized');

    //We can start other process here like rabbitmq , cronJobs and other services

    await exceptionhandler();
    return applicatios;
  } catch (error: any) {
    logger.error(`Application initialization failed ${error.stack}`);
    throw error;
  }
};
