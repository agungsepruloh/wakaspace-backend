import express, { Express } from 'express';
import cors from 'cors';
import routes from '../api';
import { WakaspaceConfig } from '@wakaspace/config';

/**
 * @param {Express} app Express Application
 */
export default async (app) => {
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(express.json({ limit: '50mb' }));
  app.use(cors());

  app.get('/', (req, res, next) => {
    return res.status(200).send({ message: 'OK!' });
  });

  app.use(WakaspaceConfig.apiPrefix, routes());
};
