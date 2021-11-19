import { Express } from 'express';
import expressLoader from './express';

/**
 * @param {Express} app Express Application
 */
export default async (app) => {
  await expressLoader(app);
  console.log('🔥 Express loaded');
};
