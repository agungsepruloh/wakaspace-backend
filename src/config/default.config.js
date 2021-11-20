import config from 'config';

export const WakaspaceConfig = {
  get: config.get,
  mongoDbUri: config.get('db.uri'),
  apiPrefix: config.get('api.prefix'),
};
