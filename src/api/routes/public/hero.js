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
      return res.success({ data }).status(200);
    } catch (e) {
      return next(e);
    }
  });
};
