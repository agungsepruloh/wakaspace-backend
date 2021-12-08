import { Express } from 'express';
import expressLoader from './express';
import mongooseLoader from './mongoose';
import moralis from './moralis';

/**
 * @param {Express} app Express Application
 */
export default async (app) => {
  await mongooseLoader();
  console.log('🔥 DB loaded and connected!');

  await moralis();
  console.log('🔥 Moralis started');

  await expressLoader(app);
  console.log('🔥 Express loaded');
};
