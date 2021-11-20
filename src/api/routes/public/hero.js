import { HeroService } from '@wakaspace/services';
import { Router, Express } from 'express';

const route = Router();

/**
 * @param {Express} app Express Application
 */
export default (app) => {
  app.use('/heroes', route);

  route.get('/', async (req, res, next) => {
    try {
      const data = await HeroService.Paginate();
      return res.send({ data }).status(200);
    } catch (e) {
      return next(e);
    }
  });
};
