import mongoose from 'mongoose';
import config from '../config/env';

export default async (): Promise<any> => {
  const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const db = await mongoose.connect(config.MONGO_DB_URL, options);
  return db;
};
