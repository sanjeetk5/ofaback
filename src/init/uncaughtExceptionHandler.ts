import logger from '../utils/logger';

/**
 * This function is used to handle the uncaught exception thrown by the application. We can implement logic to how to handle
 *  error.
 */
export default async function handlerejection() {
  try {
    process.on('uncaughtException', (error) => {
      logger.error('unhaldled rejection----------->', error);
    });

    process.on('unhandledRejection', (error) => {
      logger.error('unhaldled rejection------->', error);
    });
    logger.info('****--------------Uncaught Handler middleware attached----------------***');
  } catch (error) {
    logger.error('Uncaught Handler middleware not attached');
  }
}
