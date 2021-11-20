import { RaceService } from '@wakaspace/services';
import { Router, Express } from 'express';

const route = Router();

/**
 * @param {Express} app Express Application
 */
export default (app) => {
  app.use('/races', route);

  route.get('/', async (req, res, next) => {
    try {
      const data = await RaceService.GetAll();
      return res.send({ data }).status(200);
    } catch (e) {
      return next(e);
    }
  });
};
