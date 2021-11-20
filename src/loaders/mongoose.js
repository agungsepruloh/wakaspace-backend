import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { WakaspaceConfig } from '../config';

export default async () => {
  const connection = await mongoose.connect(WakaspaceConfig.mongoDbUri, {
    useNewUrlParser: true,
    autoIndex: true,
    useUnifiedTopology: true,
  });

  connection.plugin(mongooseDelete, { overrideMethods: true });

  return connection.connection.db;
};
