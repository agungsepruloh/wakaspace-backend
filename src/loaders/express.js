import express, { Express } from 'express';
import cors from 'cors';
import routes from '../api';
import { WakaspaceConfig } from '@wakaspace/config';
import { appendExpressResponseProperty, coreMiddleware } from '@wakaspace/core';

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

  // Appending Response properties to help our application to efficient
  app.use(appendExpressResponseProperty.appendError);
  app.use(appendExpressResponseProperty.appendSuccess);

  app.use(WakaspaceConfig.apiPrefix, routes());

  /**
   *  Handling Error
   */
  app.use(coreMiddleware.errorHandler);
};
