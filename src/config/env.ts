import path from 'path';
import * as dotenv from 'dotenv';
import logger from '../utils/logger';
const environment = process.env.NODE_ENV || 'dev';
logger.info(`Application is using ${environment} environment`);
const envPath = path.join(__dirname, '..', '..', '.env');
dotenv.config({ path: envPath });

export default {
  dbconfig: {
    dbname: process.env.DB_NAME || '',
    dbhost: process.env.DB_HOST || '',
    dbpassword: process.env.DB_PASSWORD || '',
    dbuser: process.env.DB_USER || '',
  },
  PORT: process.env.PORT || 4000,
  SWAGGER_LINK: process.env.SWAGGER_LINK || 'http://localhost:4000/api-docs',
  MONGO_DB_URL: process.env.MONGO_DB_URL || 'mongodb://localhost:27017/',
  SALT_FACTOR: 10,
  HOME_DOMAIN_URL: process.env.HOME_DOMAIL_URL || 'http://localhost:4000/api/v1',
  API_URL: 'http://localhost:4000/api/v1',
  WEBSITE_NAME: process.env.WEBSITE_NAME || 'BOILERPLATE FOR NODE.JS USING TYPESCRIPT',
  corsConfig: {},
  helmetConfig: {},
  Networks: {
    chainType: 'BSC',
    currency: 'BNB',
    rpc: process.env.BSC_RPC_URL,
    tokenAddress: process.env.BSC_TOKEN,
    icoAddress: process.env.BSC_ICO,
    vestingAddress: process.env.BSC_VESTING,
    rewardsTokenAddress: process.env.BSC_TOKEN,
    startBlockToken: process.env.BSC_TOKEN_BLOCKNUMBER,
    startBlockICO: process.env.BSC_ICO_BLOCKNUMBER,
    startBlockVesting: process.env.BSC_VESTING_BLOCKNUMBER,
  },

  // MONGO_URL: process.env.MONGO_URL,
  // CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
  EVENT_BATCH_SIZE: process.env.EVENTBATCHSIZE || 1000,
  // GOERLI: {
  //   INSTANCE: new Web3(process.env.ETHEREUM_RPC_URL || ''),
  //   START_BLOCK: process.env.GOERLI_START_BLOCK,
  // },
};
